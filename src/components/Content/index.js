import React, { useState, useEffect, memo } from 'react';
import FoodItem from '../FoodItem';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Table from '../../pages/Table/Table';

const cx = classNames.bind(styles);
const Content = (props) => {
    // const [foods, setFoods] = useState([]);


    useEffect(() => {
        console.log('content-render');
        // const getFoods = async () => {
        //     const q = query(collection(db, 'foods'));
        //     const querySnapshot = await getDocs(q);
        //     const data = [];
        //     querySnapshot.forEach((doc) => {
        //         data.push(doc.data());
        //     });
        //     return data;
        // };

        // getFoods().then((food) => {
        //     setFoods(food);
        // });
    }, []);

    return (
        <div className={cx('Content')}>
            {props.check ? (
                <div className={cx('dialog')}>
                    <Table changeDesk={props.changeDesk} changeTime={props.changeTime} />
                </div>
            ) : (
                <div className={cx('content-menu')}>
                    <h2>Menu</h2>
                    <div className={cx('content-menu-list-item')}>
                        {props.foods.map((food, index) => (
                            // <div className={cx('content-menu-item')}>
                            <FoodItem food={food} key={index} handleClick={props.handleClick} />
                            // </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Content);
