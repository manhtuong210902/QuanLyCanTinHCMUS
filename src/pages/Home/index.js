import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import Order from '../../components/Order';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Bill from '../../components/Bill/Bill';
import Congrat from '../../components/Congrat/Congrat';
import Enought from '../../components/Enought';
import PreLoader from '../../components/PreLoader';
const cx = classNames.bind(styles);

const Home = () => {
    const [listSelect, updateList] = useState([]);
    const [desk, setDesk] = useState();
    const [bridge, setBridge] = useState(0);
    const [check, click] = useState(0);
    const [time, selectTime] = useState(0);
    const [modal, setModal] = useState();
    const [bill, setBill] = useState();
    const [send, setSend] = useState();
    const [data, setData] = useState();
    const [foods, setFoods] = useState([]);
    const [congrat, setCongrat] = useState(false);
    const [vipType, setViptype] = useState();
    const [enought, setEnought] = useState(false);
    const [disable, setDisable] = useState(false);
    const changeDisable = (a) => {
        setDisable(a);
    };
    const changeEnought = (a) => {
        setEnought(a);
    };
    const [loading, setLoading] = useState(true);

    const changeCongrat = (a) => {
        setCongrat(a.active);
        setViptype(a.type);
    };
    const handleClick = (obj) => {
        let p = true;
        let amount;
        for (let i = 0; i < listSelect.length; i++) {
            if (obj.name === listSelect[i].name) {
                p = false;
                listSelect[i].amount = listSelect[i].amount + 1;
                amount = listSelect[i].amount;
                break;
            }
        }
        p && listSelect.push({ index: listSelect.length, amount, ...obj });
        updateList(listSelect);
        setBridge(bridge + 1);
    };
    const change = (b) => {
        console.log('h', b);
        click(b);
    };
    const changeData = (a) => {
        setData(a);
    };
    const changeSend = (a) => {
        setSend(a);
    };
    const deleteClick = (n) => {
        // listSelect=listSelect.filter((item)=>item.name!==n)
        let i = 0;
        for (i; i < listSelect.length; i++) {
            if (listSelect[i].name === n) {
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
    const changeDesk = (number) => {
        setDesk(number);
    };
    const changeList = (a) => {
        updateList(a);
    };
    const changeTime = (a) => {
        selectTime(a);
        console.log(time);
    };
    const changeBill = (a) => {
        setBill(a);
    };
    const changeModal = (a) => {
        setModal(a);
    };
    useEffect(() => {
        console.log('home-render');
        const getFoods = async () => {
            const q = query(collection(db, 'foods'));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setLoading(false);
            return data;
        };

        getFoods().then((food) => {
            setFoods(food);
        });
    }, []); // [listSelect, bridge,check,desk,time]);

    if (loading) {
        return <PreLoader />;
    }

    return (
        <div className={cx('wrap')}>
            <div className={cx('Home')}>
                <Content
                    handleClick={handleClick}
                    foods={foods}
                    key={bridge}
                    check={check}
                    listSelect={listSelect}
                    changeDesk={changeDesk}
                    changeTime={changeTime}
                    disable={disable}
                    changeDisable={changeDisable}
                />

                <Order
                    listSelect={listSelect}
                    bridge={bridge}
                    disable={disable}
                    changeDisable={changeDisable}
                    deleteClick={deleteClick}
                    change={change}
                    desk={desk}
                    time={time}
                    changeDesk={changeDesk}
                    changeTime={changeTime}
                    changeModal={changeModal}
                    changeBill={changeBill}
                    send={send}
                    changeData={changeData}
                    changeSend={changeSend}
                />
            </div>
            {modal && (
                <Bill
                    data={data}
                    bill={bill}
                    changeData={changeData}
                    changeSend={changeSend}
                    changeModal={changeModal}
                    change={change}
                    changeList={changeList}
                    changeCongrat={changeCongrat}
                    changeEnought={changeEnought}
                />
            )}
            {congrat && <Congrat changeCongrat={changeCongrat} vipType={vipType} />}
            {enought && <Enought changeEnought={changeEnought} />}
        </div>
    );
};

export default Home;
