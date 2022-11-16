import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('header')}>
            <div className={cx('header-logo')}>
                <span></span>
            </div>
        </div>
    );
}

export default Sidebar;
