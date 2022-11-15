import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FaHome, FaStore } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
const cx = classNames.bind(styles);
function Header() {
    // const isLogin = true;
    const sidebar = [
        {
            path: '/',
            name: 'Home',
            icon: FaHome,
        },
        {
            path: '/sales',
            name: 'sales',
            icon: FaStore,
        },
        {
            path: '/sign',
            name: 'Login',
            icon: BiLogInCircle,
        },
    ];
    return (
        <div className={cx('header')}>
            <div className={cx('header-logo')}>
                <NavLink to={'/'} className={cx('header-home-btn')}>
                    29
                </NavLink>
            </div>
            <div className={cx('header-sidebar')}>
                {sidebar.map((item) => (
                    <div key={item.path}>
                        <NavLink to={item.path} className={cx('header-sidebar-item')}>
                            <div className={cx('header-sidebar-icon')}>{<item.icon />}</div>
                            <span>{item.name}</span>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Header;
