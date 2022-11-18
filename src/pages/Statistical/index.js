import styles from './Statistical.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';

import Chart from './components/Chart';

const cx = classNames.bind(styles);

function Statistical() {
    let currentDay = new Date().toISOString().split('T')[0];
    const [typeStatistical, setTypeStatistical] = useState('sales');
    const [typeChart, setTypeChart] = useState('bar');
    const [valueFrom, setValueFrom] = useState(currentDay);
    const [valueTo, setValueTo] = useState(currentDay);

    // const handlePush = (e) => {
    //     e.preventDefault();

    //     foods.forEach(async (food) => {
    //         const docRef = await addDoc(collection(db, "foods"), {
    //             name: food.name,
    //             price: food.price,
    //             priceImport: food.priceImport,
    //             image: food.image,
    //           });
    //           console.log("Document written with ID: ", docRef.id);
    //     })
    // }

    return (
        <div className={cx('wrapper')}>
            {/* <button onClick={handlePush}>push</button> */}
            <div className={cx('select-group')}>
                <div className={cx('select-type')}>
                    <select
                        className={cx('select-item')}
                        value={typeStatistical}
                        onChange={(e) => {
                            setTypeStatistical(e.target.value);
                        }}
                    >
                        <option value="sales">Doanh thu</option>
                        <option value="foods">Món Ăn</option>
                    </select>

                    <select
                        className={cx('select-item')}
                        value={typeChart}
                        onChange={(e) => {
                            setTypeChart(e.target.value);
                        }}
                    >
                        <option value="bar">Biểu đồ cột</option>
                        <option value="pie">Biểu đồ tròn</option>
                        <option value="doughnut">Biểu đồ Doughnut</option>
                        <option value="line">Biểu đồ đường</option>
                    </select>
                </div>

                <div className={cx('select-date')}>
                    <label>Từ ngày</label>
                    <input
                        type="date"
                        value={valueFrom}
                        onChange={(e) => {
                            setValueFrom(e.target.value);
                        }}
                    />
                    <label>đến ngày</label>
                    <input
                        type="date"
                        value={valueTo}
                        onChange={(e) => {
                            setValueTo(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('chart', { bar: typeChart === 'bar' || typeChart === 'line' })}>
                    <Chart typeStatistical={typeStatistical} typeChart={typeChart} date={{ valueFrom, valueTo }} />
                </div>
            </div>
        </div>
    );
}

export default Statistical;
