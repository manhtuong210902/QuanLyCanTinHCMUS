import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, onSnapshot, addDoc, setDoc, doc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import classNames from 'classnames/bind';
import styles from './Storage.module.scss';
const cx = classNames.bind(styles);
const Storage = () => {
    const [storages, setStorage] = useState([]);
    const [listFood, setListFood] = useState([]);
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState();
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodAmount, setFoodAmount] = useState('');
    const [foodPriceImport, setFoodPriceImport] = useState('');

    //read data
    useEffect(() => {
        const getFastFoods = onSnapshot(
            collection(db, 'foods'),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                list = list.filter((item) => item.type === 'fast food');
                setListFood(list);
                console.log('');
            },
            (error) => {
                console.log(error);
            },
        );

        const getStorageFoods = onSnapshot(
            collection(db, 'storage'),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                list = list.map((item) => {
                    let i = 0;
                    for (; i < listFood.length; i++) if (listFood[i].id === item.foodId) break;
                    return {
                        ...item,
                        image: listFood[i].image,
                        name: listFood[i].name,
                        price: listFood[i].price,
                        priceImport: listFood[i].priceImport,
                    };
                });
                setStorage(list);
                console.log('');
            },
            (error) => {
                console.log(error);
            },
        );

        return () => {
            getFastFoods();
            getStorageFoods();
        };
    }, [listFood, storages]);

    //get url image
    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
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

    //set img
    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
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
            amount: parseInt(foodAmount),
            img: imgUrl,
            name: foodName,
            price: parseInt(foodPrice),
            priceImport: parseInt(foodPriceImport),
            status: true,
            typeFood: 'fast food',
        };

        try {
            const pos = checkInArr(storages, data);
            if (pos === -1) addDoc(collection(db, 'storage'), data);
            else {
                const value = storages[pos].amount;
                const id = storages[pos].id;
                storages[pos] = data;
                storages[pos].amount += value;
                storages[pos].id = id;
                setStorage(storages);
                console.log(storages[pos].id);

                setDoc(doc(db, 'storage', storages[pos].id), storages[pos]);
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
                                    <span>Số lượng: {item.amont}</span>
                                </div>
                                <div className={cx('storage-price')}>
                                    <div className={cx('storage-price-total')}> Giá bán: {item.price}đ</div>
                                    <div className={cx('storage-price-total')}> Giá nhập: {item.priceImport}đ</div>
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
