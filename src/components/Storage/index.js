import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
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
                image: '/images/food1.png',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                image: '/images/food6.jpg',
                amount: 1,
            },
            {
                name: 'Coca cola',
                price: 10000,
                image: '/images/food6.jpg',
                amount: 1,
            },
        ]);
    }, []);
    //end test

    return (
        <div className={cx('Order')}>
            <h2>My order</h2>
            <div className={cx('order-bill')}>
                <div className={cx('order-list')}>
                    {storages.map((item, index) => (
                        <div className={cx('order-item')} key={index}>
                            <img src={item.image} alt="" />
                            <div className={cx('order-info')}>
                                <span>{item.name}</span>
                                <div className={cx('order-amount')}>
                                    <div className={cx('order-amount-change')}>-</div>
                                    <div className={cx('order-amount-num')}>{item.amount}</div>
                                    <div className={cx('order-amount-change')}>+</div>
                                </div>
                            </div>
                            <div className={cx('order-price')}>
                                <div className={cx('order-price-total')}>{item.price * item.amount}đ</div>
                                <div className={cx('order-price-del')}>
                                    <RiDeleteBinLine />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('order-cal')}></div>
                <button className={cx('order-btn')}>Đặt món</button>
            </div>
        </div>
    );
};

export default Storage;
