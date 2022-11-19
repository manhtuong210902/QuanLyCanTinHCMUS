// import styles from './Chart.module.scss';
// import classNames from 'classnames/bind';

import { db } from '../../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({ typeStatistical, typeChart, date, listDate }) {
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
            const q = query(
                collection(db, 'orderDetails'),
                where('date', '>=', date.valueFrom),
                where('date', '<=', date.valueTo),
            );
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        };
        const getBills = async () => {
            const q = query(
                collection(db, 'bills'),
                where('orderDate', '>=', date.valueFrom),
                where('orderDate', '<=', date.valueTo),
                where('typePament', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        }

        if(typeStatistical === 'foods') {
            getFoods().then((dataLabels) => {
                setLabels(dataLabels);
                getOrderDetails().then((data) => {
                    const dataForEachLabel = new Array(dataLabels.length).fill(0);
                    dataLabels.forEach((label, index) => {
                        data.forEach((bill) => {
                            if (label === bill.nameFood) {
                                dataForEachLabel[index] += bill.totalMoney;
                            }
                        });
                    });
                    setDataChart(dataForEachLabel);
                });
            });
        } else {
            setLabels(listDate);
            getBills().then(bills => {
                const dataForEachLabel = new Array(listDate.length).fill(0);
                listDate.forEach((date, index) => {
                    bills.forEach((bill) => {
                        if (date === bill.orderDate) {
                            dataForEachLabel[index] += bill.total;
                        }
                    });
                });
                setDataChart(dataForEachLabel);
            })
        }
        
    }, [date, typeStatistical]);

    const data = {
        labels,
        datasets: [
            {
                label: ``,
                data: dataChart,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(235, 206, 86, 0.2)',
                    'rgba(34, 220, 126, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(127, 126, 126, 0.2)',
                    'rgba(108, 247, 248, 0.2)',
                    'rgb(248, 169, 214, 0.2)',
                    'rgb(155, 251, 61, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(235, 206, 86, 1)',
                    'rgba(34, 220, 126, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(127, 126, 126, 1)',
                    'rgba(108, 247, 248, 1)',
                    'rgb(248, 169, 214, 1)',
                    'rgb(155, 251, 61, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return typeChart === 'bar' ? (
        <Bar options={options} data={data} />
    ) : typeChart === 'doughnut' ? (
        <Doughnut data={data} />
    ) : typeChart === 'pie' ? (
        <Pie data={data} />
    ) : typeChart === 'line' ? (
        <Line data={data} />
    ) : (
        ''
    );
}

export default Chart;
