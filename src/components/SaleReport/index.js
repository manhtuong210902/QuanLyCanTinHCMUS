import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import styles from './SalesReport.module.scss';
import classNames from 'classnames/bind';
import { BsPrinter } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import { formatDay, formatMonth } from '../../utils';

const cx = classNames.bind(styles);

function SaleReport({ typeDate, value }) {
    const componentRef = useRef();

    const [orderDetails, setOrderDetails] = useState([]);
    const [total, setTotal] = useState(0);

    function groupByDateAndName(items) {
        var helper = {};
        var result = items.reduce(function (r, o) {
            var key = o.nameFood + '-' + o.date;

            if (!helper[key]) {
                helper[key] = Object.assign({}, o); // create a copy of o
                r.push(helper[key]);
            } else {
                helper[key].quantity += o.quantity;
                helper[key].totalMoney += o.totalMoney;
            }

            return r;
        }, []);

        return result;
    }

    function groupByName(items) {
        var finalArr = items.reduce((m, o) => {
            var found = m.find((p) => p.nameFood === o.nameFood);
            if (found) {
                found.quantity += o.quantity;
                found.totalMoney += o.totalMoney;
            } else {
                m.push(o);
            }
            return m;
        }, []);

        return finalArr;
    }

    function getOrderDetails(value, typeDate) {
        let q;
        if (typeDate === 'day') {
            q = query(collection(db, 'orderDetails'), where('date', '==', value));
        } else {
            q = query(
                collection(db, 'orderDetails'),
                where('date', '>=', value),
                where('date', '<=', value + '\uf8ff'),
            );
        }

        onSnapshot(q, (snapshot) => {
            let total = 0;
            let items = snapshot.docs.map((doc) => {
                total += doc.data().totalMoney;
                return {
                    ...doc.data(),
                };
            });
            setTotal(total);
            if (typeDate === 'day') {
                setOrderDetails(groupByName(items));
            } else {
                setOrderDetails(groupByDateAndName(items));
            }
        });
    }

    useEffect(() => {
        getOrderDetails(value, typeDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, typeDate]);

    return (
        <div>
            <div className={cx('header')}>
                <h4>
                    Doanh thu bán hàng theo{' '}
                    {typeDate === 'day' ? `ngày ${formatDay(value)}` : `tháng ${formatMonth(value)}`}
                </h4>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <div className={cx('btn-print')}>
                                In <BsPrinter />
                            </div>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle={`Báo cáo doanh thu ${
                        typeDate === 'day' ? `ngày ${formatDay(value)}` : `tháng ${formatMonth(value)}`
                    }`}
                    pageStyle="print"
                />
            </div>
            <div ref={componentRef}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Đơn hàng</th>
                            <th>Tên món ăn</th>
                            <th>Số lượng bán</th>
                            <th>Ngày bán</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((orderDetail, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{orderDetail.nameFood}</td>
                                    <td>{orderDetail.quantity}</td>
                                    <td>{formatDay(orderDetail.date)}</td>
                                    <td>{orderDetail.totalMoney}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <h4 className={cx('result')}>
                    Tổng doanh thu bán hàng{' '}
                    {typeDate === 'day' ? `ngày ${formatDay(value)}` : `tháng ${formatMonth(value)}`} là: {total}đ
                </h4>
            </div>
        </div>
    );
}

export default SaleReport;
