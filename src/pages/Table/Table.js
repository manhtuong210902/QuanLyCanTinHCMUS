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
    return <div className={cx('container')}>
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