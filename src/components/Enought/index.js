import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './enought.module.scss'
const cx = classNames.bind(styles);

const Enought = (props) => {
    return (
        <div className={cx('modal-page')}>
            <div className={cx('content')}>
                    Tài khoản quý khách không đủ tiền!
                    <div className={cx('list-btn')} style={{marginTop:"50px"}}>
                    <button
                        className={cx('btn')}
                        onClick={()=>{
                            props.changeEnought(false)
                        }}
                    >
                        back
                    </button>
                    <NavLink to={'/profile'} key={"btn"} className={cx('btn')}>
                        <span className={cx('text')}>Nạp tiền</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Enought;