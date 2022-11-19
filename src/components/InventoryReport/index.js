import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { db } from '../../firebase/config';
import styles from '../SaleReport/SalesReport.module.scss';
import classNames from 'classnames/bind';
import ReactToPrint from 'react-to-print';
import { BsPrinter } from 'react-icons/bs';

const cx = classNames.bind(styles);

function InventoryReport() {
    const componentRef = useRef();
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
            <div className={cx('header')}>
                <h4>Báo cáo hàng tồn kho</h4>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <div className={cx('btn-print')}>
                                In <BsPrinter />
                            </div>
                        );
                    }}
                    content={() => componentRef.current}
                    documentTitle={`báo cáo hàng tồn kho`}
                    pageStyle="print"
                />
            </div>
            <Table ref={componentRef} striped bordered hover>
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
