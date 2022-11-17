import React, { useState, useEffect } from 'react';
import { BsUpload } from 'react-icons/bs';
import classNames from 'classnames/bind';
import styles from './Storage.module.scss';
const cx = classNames.bind(styles);
const Storage = () => {
    const [storages, setStorage] = useState([]);
    useEffect(() => {
        setStorage([
            {
                name: 'Phở bò',
                price: 30000,
                cost: 20000,
                image: '/images/food1.png',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                cost: 20000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                cost: 20000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                cost: 20000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                cost: 20000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                cost: 20000,
                image: '/images/food6.jpg',
                amount: 1,
            },
        ]);
    }, []);
    //end test

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
                                    <div className={cx('storage-price-total')}> Giá nhập: {item.cost}đ</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('storage-new-food')}>
                    <h4>Thêm sản phẩm</h4>
                    <div className={cx('storage-new-image')}>
                        <img src="/images/food1.png" alt="" />
                        <BsUpload className={cx('storage-new-upload')} />
                    </div>
                    <div className={cx('storage-info-food')}>
                        <input className={cx('storage-food-name')} placeholder="Tên món ăn" />
                        <input className={cx('storage-food-amount')} placeholder="Số lượng" />
                        <input className={cx('storage-food-cost')} placeholder="Giá bán" />
                        <input className={cx('storage-food-price')} placeholder="Giá nhập" />
                    </div>
                    <button className={cx('storage-btn-add')}>Thêm sản phẩm</button>
                </div>
            </div>
        </div>
    );
};

export default Storage;
