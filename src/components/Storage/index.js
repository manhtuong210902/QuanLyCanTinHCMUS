import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, query, getDocs, where, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { AiTwotoneEdit } from 'react-icons/ai';
import classNames from 'classnames/bind';
import styles from './Storage.module.scss';
const cx = classNames.bind(styles);
const Storage = () => {
    const [storages, setStorage] = useState([]);
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState();
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodAmount, setFoodAmount] = useState('');
    const [foodPriceImport, setFoodPriceImport] = useState('');

    //read data
    useEffect(() => {
        const getFoods = async () => {
            const q = query(collection(db, 'foods'), where('type', '==', 'fast food'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                const tmp = { ...doc.data(), id: doc.id };
                data.push(tmp);
            });
            return data;
        };

        const getStorage = async () => {
            const q = query(collection(db, 'storage'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        };

        getStorage().then((storage) => {
            getFoods().then((foods) => {
                const arr = [];
                storage.forEach((store) => {
                    foods.forEach((food) => {
                        if (food.id === store.foodId) {
                            arr.push({
                                ...store,
                                name: food.name,
                                price: food.price,
                                priceImport: food.priceImport,
                                image: food.image,
                            });
                        }
                    });
                });
                setStorage(arr);
            });
        });
    }, []);

    //get url image
    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, `images/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (snapshot) => {
                    if (snapshot.state === 'running' || snapshot.state === 'paused') {
                        return;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL);
                    });
                },
            );
        };
        img && uploadFile();
    }, [img]);

    const checkInArr = (arr, tmp) => {
        for (let i = 0; Array.isArray(arr) && i < arr.length; i++) {
            if (arr[i].name === tmp.name) {
                return i;
            }
        }
        return -1;
    };

    const handlePreviewImage = (e) => {
        const imagePath = e.target.files[0];
        imagePath.preview = URL.createObjectURL(imagePath);
        setImg(imagePath);
    };

    const handleAdditem = async (e) => {
        e.preventDefault();
        const data = {
            image: imgUrl,
            name: foodName,
            price: parseInt(foodPrice),
            priceImport: parseInt(foodPriceImport),
            type: 'fast food',
        };

        try {
            const pos = checkInArr(storages, data);
            if (pos === -1) {
                const docRef = await addDoc(collection(db, 'foods'), data);
                // await updateDoc(doc(db, 'foods', docRef.id), {  //test update
                //     ...data,
                //     foodId: docRef.id

                // });
                const storageInfo = {
                    amount: parseInt(foodAmount),
                    status: true,
                    foodId: docRef.id,
                };
                addDoc(collection(db, 'storage'), storageInfo);
            } else {
                const a = parseInt(foodAmount) + parseInt(storages[pos].amount);
                const foodId = storages[pos].foodId;
                const q = query(collection(db, 'storage'), where('foodId', '==', foodId));
                const querySnapshot = await getDocs(q);
                let id = '';
                querySnapshot.forEach((doc) => {
                    id = doc.id;
                });

                await updateDoc(query(collection(db, 'storage', id)), {
                    amount: a,
                });
            }
        } catch (err) {
            console.log(err);
        }
        setFoodName('');
        setFoodAmount('');
        setFoodPrice('');
        setFoodPriceImport('');
    };

    const getFood = (type, value) => {
        if (type === 'name') setFoodName(value);
        else if (type === 'amount') {
            setFoodAmount(value);
        } else if (type === 'price') setFoodPrice(value);
        else if (type === 'import') setFoodPriceImport(value);
    };

    return (
        <div className={cx('storage')}>
            <div className={cx('storage-header')}>
                <h2>STORAGE</h2>
            </div>
            <div className={cx('storage-body')}>
                <div className={cx('storage-bill')}>
                    <div className={cx('storage-list')}>
                        {storages.map((item, index) => (
                            <div className={cx('storage-item')} key={index}>
                                <img src={item.image} alt="" />
                                <div className={cx('storage-info')}>
                                    <span>{item.name}</span>
                                    <span>Số lượng: {item.amount}</span>
                                </div>
                                <div className={cx('storage-price')}>
                                    <div className={cx('storage-price-total')}> Giá bán: {item.price}đ</div>
                                    <div className={cx('storage-price-total')}> Giá nhập: {item.priceImport}đ</div>
                                </div>
                                <div className={cx('storage-edit')}>
                                    <AiTwotoneEdit />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('storage-new-food')}>
                    <h4>Thêm sản phẩm</h4>
                    <div className={cx('storage-new-image')}>
                        <img src={img === '' ? '/images/img_upload.png' : img.preview} alt="" />
                        <input
                            type="file"
                            onChange={(e) => {
                                handlePreviewImage(e);
                            }}
                        />
                    </div>
                    <div className={cx('storage-info-food')}>
                        <input
                            className={cx('storage-food-name')}
                            placeholder="Tên món ăn"
                            value={foodName}
                            onChange={(e) => getFood('name', e.target.value)}
                        />
                        <input
                            className={cx('storage-food-amount')}
                            placeholder="Số lượng"
                            value={foodAmount}
                            onChange={(e) => getFood('amount', e.target.value)}
                        />
                        <input
                            className={cx('storage-food-cost')}
                            placeholder="Giá bán"
                            value={foodPrice}
                            onChange={(e) => getFood('price', e.target.value)}
                        />
                        <input
                            className={cx('storage-food-price')}
                            placeholder="Giá nhập"
                            value={foodPriceImport}
                            onChange={(e) => getFood('import', e.target.value)}
                        />
                    </div>
                    <button onClick={(e) => handleAdditem(e)} className={cx('storage-btn-add')}>
                        Thêm sản phẩm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Storage;
