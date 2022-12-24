import React, { useState, memo } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';
import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
import { Col } from 'react-bootstrap';
import { useEffect } from 'react';
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
            let a=0
            props.select.forEach((f)=>{
                if(f.foodId===food.foodId)
                a=f.amount
            })
            set(amount- a> 0);
            return(amount-a>0)
        });
    
    return (
        <Col xs={6}>
            <div className={cx('foodItem')}>
                <div className={cx('foodImg')}>
                    <img src={food.image} alt="" />
                </div>
                <div className={cx('food-info')}>
                    <label className={cx('food-label')}>{food.name}</label>
                    {able ? (
                        <>
                            <div className={cx('food-price')}>
                                Giá: <span>{food.price}đ</span>
                            </div>
                            <div className={cx('btn-add')}>
                                <button
                                    className={cx('food-add')}
                                    onClick={
                                        () =>{
                                            if (food.type === 'fast food')
                                                getData().then((amount) => {
                                                    let a=0
                                                    props.select.forEach((f)=>{
                                                        if(f.foodId===food.foodId)
                                                        a=f.amount
                                                        console.log(a,amount)
                                                    })
                                                    if(amount-a>0) {
                                                        props.handleClick({
                                                            name: food.name,
                                                            price: food.price,
                                                            image: food.image,
                                                            amount: 1,
                                                            foodId: food.foodId,
                                                            type: food.type,
                                                            able:true
                                                        })
                                                    }
                                                });
                                            else{
                                                props.handleClick({
                                                    name: food.name,
                                                    price: food.price,
                                                    image: food.image,
                                                    amount: 1,
                                                    foodId: food.foodId,
                                                    type: food.type,
                                                    able:true
                                                })
                                            }
                                        }
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={cx('no-food')}>Hết hàng</div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default memo(FoodItem);
