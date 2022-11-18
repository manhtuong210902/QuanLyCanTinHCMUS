import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function SaleReport({ typeDate, value }) {
    const [orderDetails, setOderDetails] = useState([]);

    function getOrderDetails(value, typeDate) {
        let q;
        if (typeDate === 'day') {
            console.log(value);
            q = query(collection(db, 'oderDetails'), where('date', '==', value));
        } else {
            q = query(collection(db, 'oderDetails'), where('date', '>=', value), where('date', '<=', value + '\uf8ff'));
        }

        onSnapshot(q, (snapshot) => {
            let items = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                };
            });
            setOderDetails(items);
        });
    }

    useEffect(() => {
        getOrderDetails(value, typeDate);
    }, [value, typeDate]);

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
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
                                <td>1</td>
                                <td>{orderDetail.nameFood}</td>
                                <td>{orderDetail.quantity}</td>
                                <td>{orderDetail.date}</td>
                                <td>{orderDetail.totalMoney}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default SaleReport;
