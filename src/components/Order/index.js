import React, { useState, useEffect, memo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { collection, addDoc, where, getDocs, query } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal';
const cx = classNames.bind(styles);
const Order = (props) => {
    const [orders, setOrder] = useState([]);
    const [check, tick] = useState();
    const [counter, setCounter] = useState([{ id: 0, value: 1 }]);
    const [vip, setVip] = useState(0);

    const [show, setShow] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    async function checkIsAdmin(userEmail) {
        if (userEmail) {
            const q = await query(collection(db, 'users'), where('email', '==', userEmail), where('admin', '==', true));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(auth.currentUser);
            if (auth.currentUser) {
                checkIsAdmin(auth.currentUser.email);
            }
        });
    }, [navigate]);

    const handleDescease = (val, id) => {
        counter[id] === undefined
            ? counter.push({ id: id, value: val - 1 >= 0 ? val - 1 : 0 })
            : (counter[id].value = val - 1 >= 0 ? val - 1 : 0);
        setCounter(counter);
    };
    const handleIncease = (val, id) => {
        counter[id] === undefined ? counter.push({ id: id, value: val + 1 }) : (counter[id].value = val + 1);
        setCounter(counter);
    };
    const [flag, changeFlag] = useState(0);
    //test
    useEffect(() => {
        setCounter([{ id: 0, value: 1 }]);
        setOrder(props.listSelect);

        tick(props.check);
        console.log('order-render');
        props.changeDesk('...');
        props.changeTime('...');
        props.changeData('');
        vipCount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders, props.bridge, props.listSelect, props.check, props.send, vip]);
    //end test
    const total = () => {
        return orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    };
    const totalPrice = () => {
        let des = 0;
        if (vip === '3%') des = 0.03;
        else if (vip === '5%') des = 0.05;
        else if (vip === '10%') des = 0.1;
        return (1 - des) * orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    };
    const vipPrice = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            let level;
            querySnapshot.forEach((doc) => {
                level = doc.data().level;
            });
            if (level == 'C') return '3%';
            else if (level == 'B') return '5%';
            else if (level == 'A') return '10%';
        }
        return 0;
    };
    const vipCount = () => {
        vipPrice().then((data) => {
            setVip(data);
        });
    };

   
    const getCurrentDate = (separator = '-') => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
    };
    // console.log(checkValue);
    const checkValue = (e) => {
        tick(e.target.checked);
        props.change(e.target.checked);
    };

    function addTimes(startTime, endTime) {
        let times = [0, 0];
        let max = times.length;

        let a = (startTime || '').split(':');
        let b = (endTime || '').split(':');

        // normalize time values
        for (var i = 0; i < max; i++) {
            a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
            b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
        }

        // store time values
        for (let i = 0; i < max; i++) {
            times[i] = a[i] + b[i];
        }

        let hours = times[0];
        let minutes = times[1];

        if (minutes >= 60) {
            let h = (minutes / 60) << 0;
            hours += h;
            minutes -= 60 * h;
        }

        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
    }
    return (
        <div className={cx('Order')} key={props.bridge}>
            <h2>My order</h2>
            <div className={cx('order-bill')}>
                <div className={cx('order-list')}>
                    {orders.map((item, index) => (
                        <div className={cx('order-item')} key={index}>
                            <div className="d-flex">
                                <img src={item.image} alt="" />
                                <div className={cx('order-info')}>
                                    <span>{item.name}</span>
                                    <div className={cx('order-amount')}>
                                        <div
                                            className={cx('order-amount-change')}
                                            onClick={() => {
                                                handleDescease(item.amount, item.index);
                                                item.amount = counter[item.index].value;
                                                changeFlag(flag + 1);
                                            }}
                                        >
                                            -
                                        </div>
                                        <div className={cx('order-amount-num')}>{item.amount}</div>
                                        <div
                                            className={cx('order-amount-change')}
                                            onClick={() => {
                                                handleIncease(item.amount, item.index);
                                                item.amount = counter[item.index].value;
                                                changeFlag(flag + 1);
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order-price')}>
                                <div className={cx('order-price-total')}>{item.price * item.amount}đ</div>
                                <div className={cx('order-price-del')}>
                                    <RiDeleteBinLine onClick={() => props.deleteClick(item.name)} />
                                </div>
                            </div>
                            <script></script>
                        </div>
                    ))}
                </div>
                <div className={cx('order-cal')}>
                    <div className={cx('order-or')}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                type="checkbox"
                                className={cx('tacheck')}
                                checked={check}
                                onChange={(e) => checkValue(e)}
                                name="table"
                                value="table"
                            />
                            <label>Đặt bàn</label>
                        </div>
                        {check &&
                            `Số bàn: ${props.desk ? props.desk : '...'} 
                                Khung giờ:  ${props.time ? props.time : '...'} ${props.time ? 'đến' : ''} ${
                                props.time ? addTimes(props.time, '00:30') : ''
                            }`}
                    </div>
                    <div className={cx('order-price-total')}>
                        <span>Tổng tiền: </span>
                        <span>{total()} đ</span>
                    </div>
                    <div className={cx('order-price-total')}>
                        <span>Ưu đãi: </span>
                        <span>{vip}</span>
                    </div>
                    <div className={cx('order-cost')}>
                        <span>Thanh toán: </span>
                        <span>{totalPrice()}</span>
                    </div>
                    <button
                        className={cx('order-btn')}
                        onClick={() => {
                            const auth = getAuth();
                            const user = auth.currentUser;

                            if (user === null) {
                                setShow(true);
                            } else {
                                props.changeModal(true);
                                props.changeBill({
                                    userName: user ? user.displayName : '',
                                    orderDate: getCurrentDate(),
                                    total: totalPrice(),
                                    time: props.time,
                                    timeEnd: addTimes(props.time, '00:30'),
                                    table: props.desk,
                                    orders: orders,
                                });
                                props.changeData({
                                    bills: {
                                        userID: user ? user.uid : '',
                                        orderDate: getCurrentDate(),
                                        total: totalPrice(),
                                        typePament: true,
                                        time: props.time,
                                        table: props.desk,
                                    },
                                    details: orders.map((order) => {
                                        return {
                                            foodId: order?.foodId || 1, ////
                                            date: getCurrentDate(),
                                            nameFood: order.name,
                                            quantity: order.amount,
                                            totalMoney: order.price * order.amount,
                                            type: order.type,
                                        };
                                    }),
                                });
                            }
                        }}
                    >
                        Đặt món
                    </button>
                </div>
                <CustomModal
                    show={show}
                    setShow={setShow}
                    title={'Xảy ra lỗi'}
                    body={'Bạn chưa đăng nhập, nhấn OK để đăng nhập!'}
                    textPrimary={'Đăng nhập'}
                    textSecondary={'Hủy'}
                />
            </div>
        </div>
    );
};

export default memo(Order);
