import React, { useState, memo } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';
import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
import { Col } from 'react-bootstrap';
const cx = classNames.bind(styles);
const FoodItem = (props) => {
    const food = props.food;
    const [able, set] = useState(true);
    const q = query(collection(db, 'storage'), where('foodId', '==', food.foodId));
    const getData = async () => {
        const querySnapshot = await getDocs(q);
        let amount = '';
        querySnapshot.forEach((doc) => {
            amount = doc.data().amont;
        });
        return amount;
    };
    if (food.type === 'fast food')
        getData().then((amount) => {
            set(amount !== 0);
        });
    return (
        <Col xs={6}>
            <div className={cx('foodItem')}>
                <img src={food.image} alt="" />
                <div className={cx('food-info')}>
                    <label className={cx('food-label')}>{food.name}</label>
                    <div className={cx('food-price')}>
                        Gía :<span>{food.price}đ</span>
                    </div>
                    {able ? (
                        <div className={cx('btn-add')}>
                            <button
                                className={cx('food-add')}
                                onClick={
                                    () =>
                                        props.handleClick({
                                            name: food.name,
                                            price: food.price,
                                            image: food.image,
                                            amount: 1,
                                            foodId: food.foodId,
                                            type: food.type,
                                        }) //foodId:
                                }
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <div style={{ color: 'red' }}>Hết hàng</div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default memo(FoodItem);
