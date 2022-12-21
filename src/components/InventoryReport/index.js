import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import styles from '../SaleReport/SalesReport.module.scss';
import classNames from 'classnames/bind';
import ReactToPrint from 'react-to-print';
import { BsPrinter } from 'react-icons/bs';
import { getCurrDay } from '../../utils';

const cx = classNames.bind(styles);

function InventoryReport() {
    const componentRef = useRef();
    const [inventorys, setInventorys] = useState([]);

    async function getInventorys() {
        const q = query(collection(db, 'storage'));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    }

    useEffect(() => {
        getInventorys()
            .then((data) => {
                let items = data.map(async (storageItem) => {
                    const q = query(collection(db, 'foods'));
                    const querySnapshot = await getDocs(q);
                    for (let i = 0; i < querySnapshot.docs.length; i++) {
                        if (querySnapshot.docs[i].id === storageItem.foodId) {
                            console.log(true);
                            return {
                                amount: storageItem.amont,
                                ...querySnapshot.docs[i].data(),
                            };
                        }
                    }
                });
                return items;
            })
            .then((data) => {
                let items = Promise.all(data);
                return items;
            })
            .then((data) => {
                setInventorys(data);
            });
    }, []);

    return (
        <div>
            <div className={cx('header')}>
                <h4>Báo cáo hàng tồn kho ngày {getCurrDay()}</h4>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <div className={cx('btn-print')}>
                                In <BsPrinter />
                            </div>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle={`báo cáo hàng tồn kho ngày ${getCurrDay()}`}
                    pageStyle="print"
                />
            </div>
            <Table ref={componentRef} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên thực phẩm</th>
                        <th>Số lượng tồn</th>
                    </tr>
                </thead>
                <tbody>
                    {inventorys.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
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
