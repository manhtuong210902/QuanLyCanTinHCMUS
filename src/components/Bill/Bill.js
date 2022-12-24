import classNames from 'classnames/bind';
import { collection, addDoc, query, where, getDocs, deleteDoc ,updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import styles from './bill.module.scss';
import ReactToPrint from 'react-to-print';
import { BsPrinter } from 'react-icons/bs';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

const Bill = (props) => {
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin(auth.currentUser?.email));
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

    // console.log(currentUser, isAdmin);

    const componentRef = useRef();
    const C = 500000;
    const B = 1000000;
    const A = 2000000;
    const updateFoodInfo = async (id, num) => {
        const q = query(collection(db, 'storage'), where('foodId', '==', id));
        const querySnapshot = await getDocs(q);
        let docID = '';
        let amount = '';
        querySnapshot.forEach((doc) => {
            docID = doc.id;
            amount = doc.data().amont;
        });
        await deleteDoc(doc(db, 'storage', docID));
        addDoc(collection(db, 'storage'), {
            foodId: id,
            status: true,
            amont: amount - num,
        });
    };
    const getUserMoney = async () => {
        const q = query(collection(db, 'users'), where('uid', '==', props.data.bills.userID));
        const querySnapshot = await getDocs(q);
        let person = { money: 0 };
        querySnapshot.forEach((doc) => {
            person = doc.data();
        });
        return person.money;
    };
    const handleDes = async () => {
        props.data.details.forEach((food) => {
            if (food.type === 'fast food') updateFoodInfo(food.foodId, food.quantity);
        });

        const q = query(collection(db, 'users'), where('uid', '==', props.data.bills.userID));
        const querySnapshot = await getDocs(q);
        let docID = '';
        let person = { money: 0 };
        querySnapshot.forEach((doc) => {
            docID = doc.id;
            person = doc.data();
        });
        let vip = person.vip;
        await deleteDoc(doc(db, 'users', docID));
        if (!isAdmin) {
            person.money = person.money - props.data.bills.total;
            person.vip = person.vip + props.data.bills.total;
        }
        if (person.vip > C && vip < C) {
            person.level = 'C';
            props.changeCongrat({ active: true, type: 'C' });
        } else if (person.vip > B && vip < B) {
            person.level = 'B';
            props.changeCongrat({ active: true, type: 'B' });
        } else if (person.vip > A && vip < A) {
            person.level = 'A';
            props.changeCongrat({ active: true, type: 'A' });
        }
        addDoc(collection(db, 'users'), person);
    };
    const handleEnougtMoney = async () => {
        handleDes();
        props.change(false);
        props.changeModal(false);
        props.changeList([]);
        let docRef = await addDoc(collection(db, 'bills'), props.data.bills);
        const billID = docRef.id;
        await updateDoc(doc(db, 'bills', billID), {
            ...props.data.bilss,billId:billID
        })
        props.data.details.map((order) => {
            docRef = addDoc(collection(db, 'orderDetails'), {
                billID: billID,
                ...order,
            });
        });
    };
    const handleNotEnoughtMoney = async () => {
        props.changeModal(false);
        props.changeEnought(true);
    };
    return (
        <div className={cx('modal-page')}>
            <div ref={componentRef} className={cx('bill')}>
                <div className={cx('content')}>
                    <h2 style={{ marginTop: '3px', textAlign: 'center' }}>Hóa đơn</h2>
                    <div className={cx('info-table')}>
                        <table className={cx('cus-table', 'table')}>
                            <tbody>
                                <tr>
                                    <th scope="row">{isAdmin ? 'Nhân viên' : 'Khách hàng'}</th>
                                    <td>{auth.currentUser.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ngày mua:</th>
                                    <td>{props.bill.orderDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bàn đã đặt:</th>
                                    <td>{props.bill.table}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Khung giờ:</th>
                                    <td>
                                        {props.bill.time === '...'
                                            ? '...'
                                            : `${props.bill.time} đến ${props.bill.timeEnd}`}
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
                                {props.bill.orders.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{Number(order.index) + 1}</th>
                                            <td>{order.name}</td>
                                            <td>{order.amount}</td>
                                            <td>{order.price}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <th scope="row">Tổng</th>
                                    <td></td>
                                    <td></td>
                                    <td>{props.bill.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={cx('list-btn')}>
                    <button
                        className={cx('btn')}
                        onClick={() => {
                            props.change(false);
                            props.changeModal(false);
                        }}
                    >
                        Trở lại
                    </button>
                    <ReactToPrint
                        trigger={() => {
                            return (
                                <div className={cx('btn')}>
                                    <BsPrinter /> <p>In</p>
                                </div>
                            );
                        }}
                        content={() => componentRef.current}
                        documentTitle={`Hoa don`}
                        pageStyle="print"
                    />
                    <button
                        className={cx('btn')}
                        onClick={async () => {
                            const userMoney = await getUserMoney();
                            if (isAdmin || props.bill.total <= userMoney) handleEnougtMoney();
                            else handleNotEnoughtMoney();
                        }}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Bill;
