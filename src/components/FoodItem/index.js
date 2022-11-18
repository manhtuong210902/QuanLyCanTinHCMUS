import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
const cx = classNames.bind(styles);
const index = (props,{handleClick}) => {
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
                    <button className={cx('food-add')} onClick={()=>props.handleClick(
                                                                {name:food.name,
                                                                price:food.price,
                                                                image:food.image,
                                                                amount:1
                                                                })}
                    >+</button>
                </div>
            </div>
        </div>
    );
};

export default index;
