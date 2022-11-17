import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);
const Order = () => {
    const [orders, setOrder] = useState([]);
    const [numberTable, setNumberTable] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    //test
    useEffect(() => {
        setOrder([
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
            // {
            //     name: 'Coca cola',
            //     price: 10000,
            //     image: '/images/food6.jpg',
            //     amount: 1,
            // },
            // {
            //     name: 'Coca cola',
            //     price: 10000,
            //     image: '/images/food6.jpg',
            //     amount: 1,
            // },
            // {
            //     name: 'Coca cola',
            //     price: 10000,
            //     image: '/images/food6.jpg',
            //     amount: 1,
            // },
        ]);
    }, []);
    //end test
    const totalPrice = () => {
        return orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    };

    const changeTableNumber = (value) => {
        setNumberTable(value);
    };

    const changeConst = (value) => {
        setCurrentPrice(parseFloat(value));
    };
    return (
        <div className={cx('Order')}>
            <h2>My order</h2>
            <div className={cx('order-bill')}>
                <div className={cx('order-list')}>
                    {orders.map((item, index) => (
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
                <div className={cx('order-cal')}>
                    <div className={cx('order-or')}>
                        <span>Số bàn: </span>
                        <input type="text" value={numberTable} onChange={(e) => changeTableNumber(e.target.value)} />
                    </div>
                    <div className={cx('order-price-total')}>
                        <span>Tổng tiền: </span>
                        <span>{totalPrice()} đ</span>
                    </div>
                    <div className={cx('order-cost')}>
                        <span>Thanh toán: </span>
                        <input type="text" value={currentPrice} onChange={(e) => changeConst(e.target.value)} />
                    </div>
                </div>
                <button className={cx('order-btn')}>Đặt món</button>
            </div>
        </div>
    );
};

export default Order;
