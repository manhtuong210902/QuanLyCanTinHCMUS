import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { BiStore } from 'react-icons/bi';
const cx = classNames.bind(styles);

function Header() {
    const optionList = [
        {
            name: 'Home',
            path: '/',
            icon: FaHome,
        },
        {
            name: 'Sales',
            path: '/sales',
            icon: BiStore,
        },
        {
            name: 'Login',
            path: '/sign',
            icon: RiLoginCircleLine,
        },
    ];

    return (
        <div className={cx('header')}>
            <NavLink to="/" className={cx('header-logo')}>
                <img src="/images/logo.png" alt="logo" />
            </NavLink>

            <div className={cx('header-sidebar')}>
                {optionList.map((item) => (
                    <NavLink to={item.path} key={item.path} className={cx('header-sidebar-item')}>
                        <div className={cx('header-sidebar-icon')}>{<item.icon />}</div>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Header;
