import React, { useState } from 'react';
import Slider from '../Slider';
import FoodItem from '../FoodItem';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
const cx = classNames.bind(styles);
const Content = (props) => {
    const foods = [
        {
            name: 'Phở bò',
            price: 30000,
            image: '/images/food1.png',
        },
        {
            name: 'Cơm sườn',
            price: 25000,
            image: '/images/food2.png',
        },
        {
            name: 'Phở gà',
            price: 30000,
            image: '/images/food3.png',
        },
        {
            name: 'Bún bò',
            price: 30000,
            image: '/images/food4.png',
        },
        // {
        //     name: 'Nước tăng lực',
        //     price: 15000,
        //     image: '/images/food5.png',
        // },
        // {
        //     name: 'Coca cola',
        //     price: 10000,
        //     image: '/images/food6.jpg',
        // },
        // {
        //     name: 'String dâu',
        //     price: 10000,
        //     image: '/images/food7.png',
        // },
        // {
        //     name: 'Trà xanh không độ',
        //     price: 10000,
        //     image: '/images/food8.png',
        // },
        // {
        //     name: 'Bánh mì tươi kinh đô',
        //     price: 8000,
        //     image: '/images/food9.png',
        // },
        // {
        //     name: 'Bánh mì tươi Otto',
        //     price: 8000,
        //     image: '/images/food10.png',
        // },
    ];
    return (
        <div className={cx('Content')}>
            <Slider />
            <div className={cx('content-menu')}>
                <h2>Menu</h2>
                <div className={cx('content-menu-list-item')}>
                    {foods.map((food, index) => (
                        // <div className={cx('content-menu-item')}>
                        <FoodItem food={food} key={index} handleClick={props.handleClick}/>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Content;
