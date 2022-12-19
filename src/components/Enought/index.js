import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './enought.module.scss';
const cx = classNames.bind(styles);

const Enought = (props) => {
    return (
        <div className={cx('modal-page')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h5>Thông báo</h5>
                </div>
                <p>Tài khoản quý khách không đủ tiền!</p>
                <div className={cx('list-btn')}>
                    <button
                        className={cx('btn')}
                        onClick={() => {
                            props.changeEnought(false);
                        }}
                    >
                        Trở về
                    </button>
                    <NavLink to={'/profile'} key={'btn'} className={cx('btn')}>
                        <span className={cx('text')}>Nạp tiền</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Enought;
