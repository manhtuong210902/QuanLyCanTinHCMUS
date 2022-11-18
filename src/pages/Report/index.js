import classNames from 'classnames/bind';
import { useState } from 'react';
import InventoryReport from '../../components/InventoryReport';
import SaleReport from '../../components/SaleReport';
import styles from './Report.module.scss';

const cx = classNames.bind(styles);

function Report() {
    let currentDay = new Date().toISOString().split('T')[0];
    let currentMonth = currentDay.substring(0, 7);

    const [typeReport, setTypeReport] = useState('sales');
    const [typeDate, setTypeDate] = useState('day');
    const [value, setValue] = useState(currentDay);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-group')}>
                <select
                    name="typeReport"
                    className={cx('select-item')}
                    value={typeReport}
                    onChange={(e) => {
                        setTypeReport(e.target.value);
                    }}
                >
                    <option value="sales">Doanh thu</option>
                    <option value="inventory">Hàng tồn kho</option>
                </select>

                {typeReport === 'sales' ? (
                    <>
                        <select
                            name="typeDate"
                            className={cx('select-item')}
                            value={typeDate}
                            onChange={(e) => {
                                setTypeDate(e.target.value);
                                if (e.target.value === 'day') {
                                    setValue(currentDay);
                                } else {
                                    setValue(currentMonth);
                                }
                            }}
                        >
                            <option value="day">Theo ngày</option>
                            <option value="month">Theo Tháng</option>
                        </select>

                        {typeDate === 'day' ? (
                            <input
                                type="date"
                                min="2022-11-18"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                            />
                        ) : (
                            <input
                                type="month"
                                min="2022-11"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                            />
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('content')}>
                {typeReport === 'sales' ? <SaleReport typeDate={typeDate} value={value} /> : <InventoryReport />}
            </div>
        </div>
    );
}

export default Report;
