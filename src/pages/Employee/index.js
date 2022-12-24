import styles from './Employee.module.scss';
import classNames from 'classnames/bind';
import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PreLoader from '../../components/PreLoader';

const cx = classNames.bind(styles);

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    function getEmployees() {
        const q = query(collection(db, 'users'), where('admin', '==', true));
        onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                };
            });
            setEmployees(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getEmployees();
    }, []);

    if (loading) {
        return <PreLoader />;
    }

    console.log(employees);

    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>Danh sách nhân viên</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã nhân viên</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.uid}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Employee;
