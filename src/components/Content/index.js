import React, { useState, useEffect } from 'react';
import FoodItem from '../FoodItem';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Table from '../../pages/Table/Table';

const cx = classNames.bind(styles);
const Content = (props) => {
    const [foods, setFoods] = useState([]);

    // const foods = [
    //     {
    //         name: 'Phở bò',
    //         price: 30000,
    //         priceImport: 19000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood1.png?alt=media&token=5c77f01d-8d38-4979-b72b-7969dd5ae3fc',
    //     },
    //     {
    //         name: 'Cơm sườn',
    //         price: 25000,
    //         priceImport: 20000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood2.png?alt=media&token=29ae79e1-1fd7-4ed0-9ebe-22e186d23c23',
    //     },
    //     {
    //         name: 'Phở gà',
    //         price: 30000,
    //         priceImport: 23000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood3.png?alt=media&token=50fb0e13-abbf-4bf8-8667-d9b6d629e0fe',
    //     },
    //     {
    //         name: 'Bún bò',
    //         price: 30000,
    //         priceImport: 21000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood4.png?alt=media&token=30a9ab29-a3d1-4f59-8f78-1bed4d4e6483',
    //     },
    //     {
    //         name: 'Nước tăng lực',
    //         price: 15000,
    //         priceImport: 11000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood5.png?alt=media&token=12be6c4c-ea74-4af2-9e67-683fb68e05c1',
    //     },
    //     {
    //         name: 'Coca cola',
    //         price: 10000,
    //         priceImport: 7700,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood6.png?alt=media&token=9b5f79a6-051d-491f-a92e-e1f1d053ae76',
    //     },
    //     {
    //         name: 'String dâu',
    //         price: 10000,
    //         priceImport: 6500,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood7.png?alt=media&token=287df29d-e33f-4e99-9e4e-630f354e3f47',
    //     },
    //     {
    //         name: 'Trà xanh không độ',
    //         price: 10000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood8.png?alt=media&token=30757e19-5448-422e-beb9-07a61278da80',
    //     },
    //     {
    //         name: 'Bánh mì tươi kinh đô',
    //         price: 8000,
    //         priceImport: 4000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood9.png?alt=media&token=25a4d897-48dd-447a-b244-82bc9d49be02',
    //     },
    //     {
    //         name: 'Bánh mì tươi Otto',
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood10.png?alt=media&token=55188ac6-b010-47e0-8af7-481e277b81b9',
    //     },
    //     {
    //         name: 'Rivive',
    //         price: 10000,
    //         priceImport: 9000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood11.png?alt=media&token=9ce39b49-6831-44ec-bde2-bd4e9179ee72',
    //     },
    //     {
    //         name: 'Cà phê sữa đá',
    //         price: 12000,
    //         priceImport: 8000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood12.png?alt=media&token=9f18ef69-faca-49fe-ae81-06be9194b8be',
    //     },
    //     {
    //         name: 'Trà sữa',
    //         price: 10000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood13.png?alt=media&token=50ed76ec-58ce-4fa3-8777-b4734260b5de',
    //     },
    //     {
    //         name: 'Nước có ga 7up',
    //         price: 10000,
    //         priceImport: 8000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood14.png?alt=media&token=d6b4b12f-ea42-4e22-956e-b44a11a5c2eb',
    //     },
    //     {
    //         name: 'Bánh Karo',
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood15.png?alt=media&token=b26a3dc5-4df2-4f37-848e-a62a0dcb632a',
    //     },
    //     {
    //         name: 'Sữa Milo',
    //         price: 10000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood16.png?alt=media&token=4cd29c5e-5174-4311-a388-32b03f0e12d1',
    //     },
    //     {
    //         name: 'Bánh Oreo',
    //         price: 16000,
    //         priceImport: 12000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood17.png?alt=media&token=d65ff313-899f-4226-83ca-06626166e88b',
    //     },
    //     {
    //         name: `Snack Lay's`,
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood18.png?alt=media&token=72d582dc-de53-408b-ac3c-7547959bdf11',
    //     },
    //     {
    //         name: `Snack O'Star`,
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood19.png?alt=media&token=9a0e1fb5-62fb-4cd3-b825-b20884b4bbcb',
    //     },
    //     {
    //         name: `Sữa hộp Vinamilk`,
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood20.png?alt=media&token=4df82ad9-d36b-4f91-8c9e-e3071c0634a6',
    //     },
    //     {
    //         name: `Sữa hộp TH true milk`,
    //         price: 8000,
    //         priceImport: 6000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood21.png?alt=media&token=678b7d5d-b2b7-43ef-9a4a-f2eb683adfa1',
    //     },
    //     {
    //         name: `Cơm gà`,
    //         price: 25000,
    //         priceImport: 20000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood22.png?alt=media&token=be52055a-df97-44a4-abe0-e1cff78a51fe',
    //     },
    //     {
    //         name: `Sữa đậu nành Nuti`,
    //         price: 5000,
    //         priceImport: 4000,
    //         type: 'fast food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood23.png?alt=media&token=3055fc43-322f-4766-99ff-d6595ab2933c',
    //     },
    //     {
    //         name: `Cơm thịt nướng`,
    //         price: 25000,
    //         priceImport: 20000,
    //         type: 'main food',
    //         image: 'https://firebasestorage.googleapis.com/v0/b/cantinhcmus-20630.appspot.com/o/images%2Ffood24.png?alt=media&token=87eefcd7-738c-4c77-bd11-3e3269e6069e',
    //     },
    // ];

    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(db, 'foods'),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setFoods(list);
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
            {props.check ? (
                <div className={cx('dialog')}>
                    <Table changeDesk={props.changeDesk} changeTime={props.changeTime} />
                </div>
            ) : (
                <div className={cx('content-menu')}>
                    <h2>Menu</h2>
                    <div className={cx('content-menu-list-item')}>
                        {foods.map((food, index) => (
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

export default Content;
