import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import Order from '../../components/Order';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { set } from 'react-hook-form';
const cx = classNames.bind(styles);

const Home = () => {
    const [listSelect,updateList]=useState([])
    const [bridge,setBridge]=useState(0)
    const handleClick=(obj)=>{
        let p=true
        for(let i=0;i<listSelect.length;i++){
            console.log(obj.name,listSelect[i].name)
            if(obj.name===listSelect[i].name){
                p=false
                listSelect[i].amount=listSelect[i].amount+1
                break}
            }
        p&&listSelect.push({index:listSelect.length,...obj})
        updateList(listSelect)
        setBridge(bridge+1)
        console.log("b",listSelect)
    }
    const deleteClick=(n)=>{
            // listSelect=listSelect.filter((item)=>item.name!==n)
            let s=false
            let i=0
            for(i;i<listSelect.length;i++){
                if(listSelect[i].name===n){
                    s=true
                    listSelect.splice(i,1)
                }
                // listSelect[i].index= s?i-1:i
            }
            for(i=0;i<listSelect.length;i++){
                listSelect[i].index=i
            }
            setBridge(bridge+1)
        updateList(listSelect)
    }
    useEffect(()=>{
        console.log("home-render")
        
    },[listSelect,bridge])

    return (
        <div className={cx('Home')}>
            <Content handleClick={handleClick} key= {bridge} />
            
            <Order listSelect={listSelect} bridge={bridge}  deleteClick={deleteClick}/>
        </div>
    );
};

export default Home;
