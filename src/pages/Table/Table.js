import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Col, Container, Row } from 'react-bootstrap';
import { addTimes, getCurrentDate } from '../../utils';

const cx = classNames.bind(styles);

const Table = (props) => {
    let listTable = [];
    const [select, click] = useState();
    const [bills, get] = useState([]);
    const [noTable, setTable] = useState([]);
    for (let i = 1; i <= 20; i++) {
        listTable.push(i < 10 ? `0${i}` : `${i}`);
    }

    const handleSelect = (e) => {
        click(e.target.textContent);
    };
    const [time, selectTime] = useState();

    useEffect(() => {
        const getTable = async () => {
            const q = query(collection(db, 'bills'), where('orderDate', '==', getCurrentDate()));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        };
        getTable().then((table) => {
            get(table);
        });
        setTable([]);
        bills.forEach((bill) => {
            if (
                bill.table !== '...' &&
                ((bill.time <= time && time < addTimes(bill.time, '00:30')) ||
                    (time < bill.time && addTimes(time, '00:30') > bill.time))
            ) {
                noTable.push(bill.table);
                setTable(noTable);
            }
        });
    }, [time]);

    return (
        <Container>
            <Row className={cx('label', 'mb-3 d-flex gap-3')}>
                <div className={cx('table-select', 'mb-3')}>
                    <div className="d-flex align-items-center">
                        <p className={cx('title')}>Chọn khung giờ ăn: </p>
                        <input
                            type="time"
                            id="appt"
                            name="appt"
                            onChange={(e) => {
                                selectTime(e.target.value);
                                props.changeTime(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className={cx('select-btn')}
                        onClick={() => {
                            props.changeDesk(select);
                        }}
                    >
                        Chọn
                    </button>
                </div>
            </Row>
            <Row>
                {listTable.map((table, index) => {
                    return noTable.includes(table) ? (
                        <Col xl={'2'} md={'3'} xs={'6'} key={index} className={cx('table-col')}>
                            <div
                                className={cx('table-item')}
                                onClick={(e) => handleSelect(e)}
                                style={{ backgroundColor: 'red', opacity: 0.5 }}
                            >
                                {table}
                            </div>
                        </Col>
                    ) : select === table ? (
                        <Col xl={'2'} md={'3'} xs={'6'} key={index} className={cx('table-col')}>
                            <div
                                className={cx('table-item')}
                                onClick={(e) => handleSelect(e)}
                                style={{ backgroundColor: '#5eba7d' }}
                            >
                                {table}
                            </div>
                        </Col>
                    ) : (
                        <Col xl={'2'} md={'3'} xs={'6'} key={index} className={cx('table-col')}>
                            <div className={cx('table-item')} onClick={(e) => handleSelect(e)}>
                                {table}
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Table;
