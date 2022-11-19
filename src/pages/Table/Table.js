import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

const Table =(props)=>{
    let listTable=[];
    const [select,click]=useState()
    for (let i=1;i<=20;i++){
        listTable.push(i<10?`0${i}`:`${i}`);
    }

    const handleSelect=(e)=>{
        click(e.target.textContent)
    }
    const [time,selectTime]=useState()

    
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
                    select===table?
                    <div className={cx('table-item')} onClick={(e)=>handleSelect(e)} style={{backgroundColor:"#5eba7d"}}  >{table}</div>
                    :
                    <div className={cx('table-item')} onClick={(e)=>handleSelect(e)} >{table}</div>

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