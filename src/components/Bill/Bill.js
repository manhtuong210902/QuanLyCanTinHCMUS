import classNames from 'classnames/bind';
import { prodErrorMap } from 'firebase/auth';
import { collection, addDoc,query, where, getDocs, updateDoc,deleteDoc} from "firebase/firestore";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import styles from './bill.module.scss';
import ReactToPrint from 'react-to-print';
import { BsPrinter } from 'react-icons/bs';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

const Bill = (props) => {

    const [currentUser, setCurrentUser] = useState(auth.currentUser);
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
    const C=500000
    const B=1000000
    const A=2000000
    const updateFoodInfo = async(id,num)=>{
        const q = query(collection(db, "storage"), where("foodId", "==", id));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        let docID = '';
        let amount=''
        querySnapshot.forEach((doc) => {
          docID = doc.id;
          amount=doc.data().amont
        });
        console.log(docID)
        const food = doc(db, "storage", docID);
        await deleteDoc(doc(db, "storage", docID));
        addDoc(collection(db,'storage'),{
          foodId:id,
          status:true,
          amont:amount-num,
        })
    }
    const handleDes=async()=>{
        props.data.details.forEach((food)=>{
            if (food.type ==='fast food')
                updateFoodInfo(food.foodId,food.quantity)
        })

        const q = query(collection(db, "users"), where("uid", "==", props.data.bills.userID));
        const querySnapshot = await getDocs(q);
        let docID = '';
        let person={money:0}
        querySnapshot.forEach((doc) => {
          docID = doc.id;
          person=doc.data()
        });
        let vip=person.vip
        await deleteDoc(doc(db, "users", docID));
        person.money=person.money-props.data.bills.total
        person.vip=person.vip+props.data.bills.total
        addDoc(collection(db,'users'),
          person
        )
        if(person.vip>C && vip<C) {
            await deleteDoc(doc(db, "users", docID));
            person.level='C'
            addDoc(collection(db,'users'),
            person
            )
            props.changeCongrat({active:true,type:'C'})
        }
        else if(person.vip>B && vip<B) {
            await deleteDoc(doc(db, "users", docID));
            person.level='B'
            addDoc(collection(db,'users'),
            person
            )
            props.changeCongrat({active:true,type:'B'})
        }
        else if(person.vip>A && vip<A) {
            await deleteDoc(doc(db, "users", docID));
            person.level='A'
            addDoc(collection(db,'users'),
            person
            )
            props.changeCongrat({active:true,type:'A'})
        }
    }
    return (
        <div className={cx('modal-page')}>
            <div ref={componentRef} className={cx('bill')}>
                <div className={cx('content')}>
                    <h2 style={{ marginTop: '3px', textAlign: 'center' }}>Hóa đơn</h2>
                    <div className={cx('info-table')}>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Khách hàng</th>
                                    <td>{props.bill.userName}</td>
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
                                        {props.bill.time==='...'?'...':`${props.bill.time} đến ${props.bill.timeEnd}`} 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        Danh sách sản phẩm
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Đơn gía</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.bill.orders.map((order) => {
                                    return (
                                        <tr>
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
                        back
                    </button>
                    <ReactToPrint
                        trigger={() => {
                            return (
                                <div className={cx('btn')}>
                                    In <BsPrinter />
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
                            handleDes()
                            props.change(false);
                            props.changeModal(false);
                            props.changeList([]);
                            let docRef = await addDoc(collection(db, 'bills'), props.data.bills);
                            const billID = docRef.id;
                            props.data.details.map((order) => {
                                docRef = addDoc(collection(db, 'orderDetails'), {
                                    billID: billID,
                                    ...order,
                                });
                            });
                            
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Bill;
