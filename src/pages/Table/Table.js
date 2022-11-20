import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import { collection, query, where,getDocs  } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { contains } from '@firebase/util';

const cx = classNames.bind(styles);

const Table =(props)=>{
    let listTable=[];
    const [select,click]=useState()
    const [bills,get]=useState([])
    const [noTable,setTable]=useState([])
    for (let i=1;i<=20;i++){
        listTable.push(i<10?`0${i}`:`${i}`);
    }

    const handleSelect=(e)=>{
        click(e.target.textContent)
    }
    const [time,selectTime]=useState()

    const getCurrentDate = (separator = '-') => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
    };
    function addTimes (startTime, endTime) {
        let times = [ 0, 0 ]
        let max = times.length
      
        let a = (startTime || '').split(':')
        let b = (endTime || '').split(':')
      
        // normalize time values
        for (var i = 0; i < max; i++) {
          a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
          b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
        }
      
        // store time values
        for (let i = 0; i < max; i++) {
          times[i] = a[i] + b[i]
        }
      
        let hours = times[0]
        let minutes = times[1]
      
      
        if (minutes >= 60) {
          let h = (minutes / 60) << 0
          hours += h
          minutes -= 60 * h
        }
      
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
      }
    useEffect(()=>{
        console.log("table-render")
        const getTable = async () => {
            const q = query(collection(db, 'bills'), where('orderDate', '==', getCurrentDate()));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            return data;
        };
        getTable().then((table)=>{
            console.log(table)
            get(table)
        })
        setTable([])
        bills.forEach((bill)=>{
             if(bill.table!=='...' && ((bill.time <= time && time < addTimes(bill.time,"00:30")) 
            ||(time<bill.time && addTimes(time,"00:30")>bill.time))){
                console.log("oke")
                noTable.push(bill.table)
                setTable(noTable)
            }
        })
    },[time])    
    console.log("notable",noTable)
    return <div className={cx('container')}>
        <div>
            <div>

            </div>
            <div>
                <div className={(cx('label'))} for="appt" >Select a time:   
                    <input type="time" id="appt" name="appt" onChange={(e)=>{selectTime(e.target.value)
                    console.log(time)
                    console.log(e.target.value)
                    props.changeTime(e.target.value)
                }} />
                </div>
            </div>
        </div>
        <div className={cx('table-select')}>
            {listTable.map((table)=>{
                return (
                    noTable.includes(table)?
                    <div className={cx('table-item')} onClick={(e)=>handleSelect(e)} style={{backgroundColor:"red",opacity:0.5}}  >{table}</div>
                    :
                     (select===table?
                    <div className={cx('table-item')} onClick={(e)=>handleSelect(e)} style={{backgroundColor:"#5eba7d"}}  >{table}</div>
                    :
                    <div className={cx('table-item')} onClick={(e)=>handleSelect(e)} >{table}</div>
                     )
                    )
                })}
        </div>
        <button className={cx('select-btn')} onClick={()=>{
            props.changeDesk(select)
        }}>
            Chọn
        </button>
    </div> 

}

export default Table