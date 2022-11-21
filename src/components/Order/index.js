import React, { useState, useEffect, memo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getAuth } from 'firebase/auth';
import Table from '../../pages/Table/Table';
const cx = classNames.bind(styles);
const Order = (props) => {
    const [orders, setOrder] = useState([]);
    const [check,tick]=useState()
    const [currentPrice, setCurrentPrice] = useState(0);
    const [counter, setCounter] = useState([{ id: 0, value: 1 }]);

    const handleDescease = (val, id) => {
        counter[id] === undefined
            ? counter.push({ id: id, value: val - 1 >= 0 ? val - 1 : 0 })
            : (counter[id].value = val - 1 >= 0 ? val - 1 : 0);
        setCounter(counter);
    };
    const handleIncease = (val, id) => {
        counter[id] === undefined 
        ? counter.push({ id: id, value: val + 1 }) 
        : (counter[id].value = val + 1);
        setCounter(counter);
    };
    const [flag, changeFlag] = useState(0);
    //test
    useEffect(() => {
        setCounter([{ id: 0, value: 1 }]);
        setOrder(props.listSelect);
        tick(props.check)
        console.log('order-render')
        props.changeDesk('...')
        props.changeTime('...')
        props.changeData('')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders, props.bridge,props.listSelect,props.check,props.send]);
    //end test
    const totalPrice = () => {
        return orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    };


    const changeConst = (value) => {
        setCurrentPrice(parseFloat(value));
    };
    const sendData= async (e) => {
            e.preventDefault();
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                let docRef = await addDoc(collection(db, 'bills'), {
                    userID: user ? user.uid : '',
                    orderDate: getCurrentDate(),
                    total: totalPrice(),
                    typePament: true,
                    time:props.time,
                    table:props.desk
                });
                const billID = docRef.id;
                orders.forEach((order) => {
                    docRef = addDoc(collection(db, 'orderDetails'), {
                        billID: billID,
                        date: getCurrentDate(),
                        nameFood: order.name,
                        quantity: order.amount,
                        totalMoney: order.price * order.amount,
                    });
                });
            } catch (e) {
                console.log(e);
            }
        }
    const getCurrentDate = (separator = '-') => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
    };
    // console.log(checkValue);
    const checkValue=(e)=>{
        tick(e.target.checked)
        props.change(e.target.checked)
    }

    function addTimes (startTime, endTime) {
        let times = [ 0, 0 ]
        let max = times.length
      
        let a = (startTime || '').split(':')
        let b = (endTime || '').split(':')
      
        // normalize time values
        for (var i = 0; i < max; i++) {
          a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
          b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }
      
        // store time values
        for (let i = 0; i < max; i++) {
          times[i] = a[i] + b[i]
        }
      
        let hours = times[0]
        let minutes = times[1]
      
      
        if (minutes >= 60) {
          let h = (minutes / 60) << 0
          hours += h
          minutes -= 60 * h
        }
      
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
      }
    return (
        
        <div className={cx('Order')} key={props.bridge}>
            
            <h2>My order</h2>
            <div className={cx('order-bill')}>
                <div className={cx('order-list')}>
                    {orders.map((item, index) => (
                        <div className={cx('order-item')} key={index}>
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
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <input type="checkbox" className={cx('tacheck')} checked={check}
                                onChange={(e)=>checkValue(e)} 
                                name="table"  value="table"/>
                            <label>Đặt bàn</label>
                        </div>
                        {check&&`Số bàn: ${props.desk?props.desk:'...'} 
                                Khung giờ:  ${props.time?props.time:'...'} ${props.time?'đến':''} ${props.time?addTimes(props.time,"00:30"):''}`}
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
                <button
                    className={cx('order-btn')}
                    onClick={()=>{
                        const auth = getAuth();
                        const user = auth.currentUser;

                        props.changeModal(true)
                        props.changeBill({
                            userName: user ? user.displayName : '',
                            orderDate: getCurrentDate(),
                            total: totalPrice(),
                            time:props.time,
                            timeEnd:addTimes(props.time,"00:30"),
                            table:props.desk,
                            orders:orders
                        })
                        props.changeData({
                            bills:{
                                userID: user ? user.uid : '',
                                orderDate: getCurrentDate(),
                                total: totalPrice(),
                                typePament: true,
                                time:props.time,
                                table:props.desk
                            },
                            details:orders.map((order)=>{
                                return {
                                foodId:order?.foodId || 1, ////
                                date: getCurrentDate(),
                                nameFood: order.name,
                                quantity: order.amount,
                                totalMoney: order.price * order.amount
                                }
                            })
   
                        })
                    }}
                    // onClick={async (e) => {
                    //     e.preventDefault();
                    //     try {
                    //         const auth = getAuth();
                    //         const user = auth.currentUser;
                    //         let docRef = await addDoc(collection(db, 'bills'), {
                    //             userID: user ? user.uid : '',
                    //             orderDate: getCurrentDate(),
                    //             total: totalPrice(),
                    //             typePament: true,
                    //             time:props.time,
                    //             table:props.desk
                    //         });
                    //         const billID = docRef.id;
                    //         orders.forEach((order) => {
                    //             docRef = addDoc(collection(db, 'orderDetails'), {
                    //                 billID: billID,
                    //                 date: getCurrentDate(),
                    //                 nameFood: order.name,
                    //                 quantity: order.amount,
                    //                 totalMoney: order.price * order.amount,
                    //             });
                    //         });
                    //     } catch (e) {
                    //         console.log(e);
                    //     }
                    // }}
                >
                    Đặt món
                </button>
            </div>
        </div>
    );
};

export default memo(Order);
