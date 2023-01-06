import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, query, getDocs, where, setDoc, doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import { AiTwotoneEdit } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    const [count, setCount] = useState(0);
    const [newData, setNewData] = useState({ id: '', amount: 0 });
    const [validForm, setValidForm] = useState({ name: 1, amount: 1, price: 1, priceImport: 1 });
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //read data
    useEffect(() => {
        const getFoods = async () => {
            const q = query(collection(db, 'foods'), where('type', '==', 'fast food'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                const tmp = { ...doc.data() };
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
                        if (food.foodId === store.foodId) {
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
    }, [count]);

    // const uploadImage = async () => {
    //     if (img == null) return;
    //     const imageRef = ref(storage, `images/${img.name}`);
    //     uploadBytes(imageRef, img).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             setImgUrl(url);
    //         });
    //     });
    // };

    const handlePreviewImage = (e) => {
        const imagePath = e.target.files[0];
        imagePath.preview = URL.createObjectURL(imagePath);
        setImg(imagePath);
    };

    const handleAdditem = async (e) => {
        e.preventDefault();
        let c = 0;
        let check = { name: 1, amount: 1, price: 1, priceImport: 1 };
        if (foodName === '') {
            check = { ...check, name: 0 };
            c = c + 1;
        }

        if (foodPrice === '' || !parseInt(foodPrice)) {
            check = { ...check, price: 0 };
            c = c + 1;
        }

        if (foodPriceImport === '' || !parseInt(foodPriceImport)) {
            c = c + 1;
            check = { ...check, priceImport: 0 };
        }

        if (foodAmount === '' || !parseInt(foodAmount)) {
            c = c + 1;
            check = { ...check, amount: 0 };
        }
        setValidForm(check);

        if (c === 0) {
            let data = {
                name: foodName,
                price: parseInt(foodPrice),
                priceImport: parseInt(foodPriceImport),
                type: 'fast food',
            };

            if (img == null) return;
            const imageRef = ref(storage, `images/${img.name}`);
            uploadBytes(imageRef, img).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImgUrl(url);
                    data = { ...data, image: url };
                });
            });
            data = { ...data, image: imgUrl };

            try {
                console.log(data);

                const docRef = await addDoc(collection(db, 'foods'), { ...data });
                console.log(docRef.id);

                await setDoc(doc(db, 'foods', docRef.id), {
                    ...data,
                    foodId: docRef.id,
                });
                const storageInfo = {
                    amont: parseInt(foodAmount),
                    status: true,
                    foodId: docRef.id,
                };
                await addDoc(collection(db, 'storage'), storageInfo).then(() => setCount(count + 1));
            } catch (err) {
                console.log(err);
            }
            setFoodName('');
            setFoodAmount('');
            setFoodPrice('');
            setFoodPriceImport('');
            setImg('');
        }
    };

    const addOldItem = async () => {
        const a = parseInt(foodAmount) + parseInt(newData.amount);
        const q = query(collection(db, 'storage'), where('foodId', '==', newData.id));
        const querySnapshot = await getDocs(q);
        let id = '';
        querySnapshot.forEach((doc) => {
            id = doc.id;
        });
        setShow(false);
        await updateDoc(doc(db, 'storage', id), {
            amont: a,
        }).then(() => {
            setCount(count + 1);
        });
        setFoodAmount('');
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
                <h5 className={cx('title')}>Quản lý kho</h5>
            </div>
            <div className={cx('storage-body')}>
                <div className={cx('storage-bill')}>
                    <div className={cx('storage-list')}>
                        {storages.map((item, index) => (
                            <div className={cx('storage-item')} key={index} id={item.foodId}>
                                <img src={item.image} alt="" />
                                <div className={cx('storage-info')}>
                                    <span>{item.name}</span>
                                    <span>Số lượng: {item.amont}</span>
                                </div>
                                <div className={cx('storage-price')}>
                                    <div className={cx('storage-price-total')}> Giá bán: {item.price}đ</div>
                                    <div className={cx('storage-price-total')}> Giá nhập: {item.priceImport}đ</div>
                                </div>
                                <div
                                    className={cx('storage-edit')}
                                    onClick={() => {
                                        setNewData({
                                            id: item.foodId,
                                            amount: item.amont,
                                        });
                                        handleShow();
                                    }}
                                >
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
                            className={cx(`${validForm.name === 0 ? 'err' : ''}`)}
                            placeholder="Tên món ăn"
                            value={foodName}
                            onChange={(e) => getFood('name', e.target.value)}
                        />
                        <input
                            className={cx(`${validForm.amount === 0 ? 'err' : ''}`)}
                            placeholder="Số lượng"
                            value={foodAmount}
                            onChange={(e) => getFood('amount', e.target.value)}
                        />
                        <input
                            className={cx(`${validForm.price === 0 ? 'err' : ''}`)}
                            placeholder="Giá bán"
                            value={foodPrice}
                            onChange={(e) => getFood('price', e.target.value)}
                        />
                        <input
                            className={cx(`${validForm.priceImport === 0 ? 'err' : ''}`)}
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
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className={cx('modal-add-title')}>Thêm số lượng sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className={cx('modal-add')}>Số lượng: </span>
                        <input
                            className={cx('modal-add-input')}
                            type="text"
                            placeholder="Nhập số lượng cần thêm"
                            value={foodAmount}
                            onChange={(e) => setFoodAmount(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button className={cx('modal-add-btn')} onClick={addOldItem}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default Storage;
