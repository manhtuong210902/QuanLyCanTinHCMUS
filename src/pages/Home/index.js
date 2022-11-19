import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import Order from '../../components/Order';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

const Home = () => {
    const [listSelect, updateList] = useState([]);
    const [desk,setDesk]=useState()
    const [bridge, setBridge] = useState(0);
    const [check,click]=useState(0);
    const [time,selectTime]=useState(0);
    const handleClick = (obj) => {
        let p = true;
        for (let i = 0; i < listSelect.length; i++) {
            if (obj.name === listSelect[i].name) {
                p = false;
                listSelect[i].amount = listSelect[i].amount + 1;
                break;
            }
        }
        p && listSelect.push({ index: listSelect.length, ...obj });
        updateList(listSelect);
        setBridge(bridge + 1);
    };
    const change=(b)=>{
        console.log('h',b)
        click(b)
    }
    const deleteClick = (n) => {
        // listSelect=listSelect.filter((item)=>item.name!==n)
        let s = false;
        let i = 0;
        for (i; i < listSelect.length; i++) {
            if (listSelect[i].name === n) {
                s = true;
                listSelect.splice(i, 1);
            }
            // listSelect[i].index= s?i-1:i
        }
        for (i = 0; i < listSelect.length; i++) {
            listSelect[i].index = i;
        }
        setBridge(bridge + 1);
        updateList(listSelect);
    };
    const changeDesk=(number)=>{
        setDesk(number)
    }
    const changeTime=(a)=>{
        selectTime(a)
        console.log(time)
    }
    useEffect(() => {
        console.log('home-render');
    }, [listSelect, bridge,check,desk,time]);

    return (
        <div className={cx('Home')}>
            <Content handleClick={handleClick} key={bridge} check={check} changeDesk={changeDesk} changeTime={changeTime}/>

            <Order listSelect={listSelect} bridge={bridge} deleteClick={deleteClick} change={change} desk={desk} time={time}/>
        </div>
    );
};

export default Home;
