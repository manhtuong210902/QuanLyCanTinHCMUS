import React from 'react';

import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
const cx = classNames.bind(styles);
const index = (props) => {
    const food = props.food;
    return (
        <div className={cx('foodItem')}>
            <img src={food.image} alt="" />
            <div className={cx('food-info')}>
                <label className={cx('food-label')}>{food.name}</label>
                <div className={cx('food-price')}>
                    Gía:
                    <span>{food.price}đ</span>
                </div>
                <div className={cx('btn-add')}>
                    <button className={cx('food-add')}>+</button>
                </div>
            </div>
        </div>
    );
};

export default index;
