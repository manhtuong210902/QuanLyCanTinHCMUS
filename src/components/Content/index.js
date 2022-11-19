import React, { useState, useEffect } from 'react';
import Slider from '../Slider';
import FoodItem from '../FoodItem';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
const cx = classNames.bind(styles);
const Content = (props) => {
    const [foods, serFoods] = useState([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(db, 'foods'),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                serFoods(list);
            },
            (error) => {
                console.log(error);
            },
        );

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <div className={cx('Content')}>
            <Slider />
            <div className={cx('content-menu')}>
                <h2>Menu</h2>
                <div className={cx('content-menu-list-item')}>
                    {foods.map((food, index) => (
                        <FoodItem food={food} key={index} handleClick={props.handleClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Content;
