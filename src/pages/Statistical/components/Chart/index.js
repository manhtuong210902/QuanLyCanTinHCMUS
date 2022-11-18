// import styles from './Chart.module.scss';
// import classNames from 'classnames/bind';

import { db } from '../../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart({ typeStatistical, typeChart, date }) {
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: `Biểu đồ ${typeStatistical}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const [labels, setLabels] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        const getFoods = async () => {
            const q = query(collection(db, 'foods'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data().name);
            });
            return data;
        };
        const getOrderDetails = async () => {
            const q = query(collection(db, 'orderDetails'), where('date', '>=', date.valueFrom), where('date', '<=', date.valueTo));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        };

        getFoods().then((dataLabels) => {
            setLabels(dataLabels);
            getOrderDetails().then((data) => {
                console.log(data);
                const dataForEachLabel = new Array(dataLabels.length).fill(0);
                dataLabels.forEach((label, index) => {
                    data.forEach((bill) => {
                        if(label === bill.nameFood) {
                            dataForEachLabel[index] += bill.totalMoney;
                        }
                    })
                })
                setDataChart(dataForEachLabel);
            })
        });
    }, [date]);

    const data = {
        labels,
        datasets: [
            {
                label: ``,
                data: dataChart,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={data} />;
}

export default Chart;
