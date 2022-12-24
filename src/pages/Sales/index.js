import { useEffect, useState } from 'react';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import classNames from 'classnames/bind';
import styles from './Sales.module.scss';
import { auth } from '../../firebase/config';
import { addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore';

import {BsFillCheckCircleFill} from 'react-icons/bs';
import { async } from '@firebase/util';
import { formatDay } from '../../utils';

const cx = classNames.bind(styles);

const Sales = () => {
    const [bills, setBills] = useState();
    const [details, setDetails] = useState([]);
    const [type,setType]=useState([0]);
    const [typeHis,setTypeHis]=useState("yes");
    const [a, setA] = useState(0);
    const user = auth.currentUser;
    let docID = '';
    const getCurrentDate = (separator = '-') => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
    };

    
    const getBills = async () => {
        const q = query(
            collection(db, 'bills'),
            where('userID', '==', user.uid),
            where('orderDate', '==', getCurrentDate()),
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        let de = [];
        querySnapshot.forEach((doc, index) => {
            docID = doc.id;
            let d = doc.data();
            getDetails(docID).then((detail) => {
                de.push(detail);
                d.detail = detail;
                d.docid = docID;
                setA(a + 1);
            });
            data.push(d);
        });
        return { data, de };
    };
    const getDetails = async (docID) => {
        const q = query(collection(db, 'orderDetails'), where('billID', '==', docID));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
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
    useEffect(() => {
        getBills().then((data) => {
            setBills(data.data);
            setDetails(data.de);
        });
    }, [type,typeHis]);
    const clickCheck=async(id)=>{
        const q = query(collection(db, 'bills'), where('billId', '==', id));
        const querySnapshot = await getDocs(q);
        let docID = '';
        let bill
        querySnapshot.forEach((doc) => {
            docID = doc.id;
            bill=doc.data()
        });
        await updateDoc(doc(db, 'bills', id),{
            typePament:true
        });
        if(type%2==0) setType(1)
        else setType(0)
    }
    return (
        <div>
            <select name="bills" id="bills" value={typeHis} onChange={(e)=>{
                setTypeHis(e.target.value)
                console.log(typeHis)
                }}>
            <option value="yes" name="bills">Đã nhận món ăn</option>
            <option value="no" name="bills">Chưa nhận món ăn</option>
            </select>
            <div className={cx('bill-list')}>
                <div className={cx('content')}>

                    {bills?.reverse().map((bill, index) => {
                        if((typeHis==="no" && !bill.typePament)||(typeHis==="yes"&& bill.typePament))
                        return (
                            <div className={cx('bill-item')}>
                                <h2 style={{ marginTop: '3px', textAlign: 'center' }}>Hóa đơn</h2>
                                <div className={cx('icon')} onClick={()=>clickCheck(bill.billId)}>{<BsFillCheckCircleFill/>}</div>
                                <div className={cx('info-table')}>
                                    <table className={cx('cus-table', 'table')}>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Khách hàng</th>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Ngày mua:</th>
                                                <td>{formatDay(bill.orderDate)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Bàn đã đặt:</th>
                                                <td>{bill.table}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Khung giờ:</th>
                                                <td>
                                                    {bill.time === '...'
                                                        ? '...'
                                                        : `${bill.time} đến ${addTimes(bill.time, '00:30')}`}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    Danh sách sản phẩm
                                    <table className={cx('cus-table', 'table')}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col">Số lượng</th>
                                                <th scope="col">Đơn gía</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bill.detail?.map((order) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{'#'}</th>
                                                        <td>{order.nameFood}</td>
                                                        <td>{order.quantity}</td>
                                                        <td>{order.totalMoney / order.quantity}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <th scope="row">Tổng</th>
                                                <td></td>
                                                <td></td>
                                                <td>{bill.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sales;
