import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';

function InventoryReport() {
    const [inventorys, setInventorys] = useState([]);

    function getInventorys() {
        onSnapshot(collection(db, 'storage'), (snapshot) => {
            let items = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                };
            });
            setInventorys(items);
        });
    }

    useEffect(() => {
        getInventorys();
    }, []);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên thực phẩm</th>
                        <th>Giá nhập</th>
                        <th>Giá bán</th>
                        <th>Số lượng tồn</th>
                    </tr>
                </thead>
                <tbody>
                    {inventorys.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.priceImport}</td>
                                <td>{item.price}</td>
                                <td>{item.amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default InventoryReport;
