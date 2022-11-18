import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function SaleReport({ typeDate, value }) {
    const [orderDetails, setOderDetails] = useState([]);
    const [total, setTotal] = useState(0);

    function getOrderDetails(value, typeDate) {
        let q;
        if (typeDate === 'day') {
            q = query(collection(db, 'oderDetails'), where('date', '==', value));
        } else {
            q = query(collection(db, 'oderDetails'), where('date', '>=', value), where('date', '<=', value + '\uf8ff'));
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
            setOderDetails(items);
        });
    }

    useEffect(() => {
        getOrderDetails(value, typeDate);
    }, [value, typeDate]);

    return (
        <div>
            <h4>
                Doanh thu bán hàng theo {typeDate === 'day' ? 'ngày' : 'tháng'} {value}
            </h4>
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
                                <td>{orderDetail.date}</td>
                                <td>{orderDetail.totalMoney}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <h4>Tổng doanh thu bán hàng {total}</h4>
        </div>
    );
}

export default SaleReport;
