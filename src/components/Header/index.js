import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { BiStore } from 'react-icons/bi';
import { auth } from '../../firebase/config';
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

    const user = auth.currentUser;
    // if(user)
    //      console.log(user.providerData)
    return (
        <div className={cx('header')}>
            <NavLink to="/" className={cx('header-logo')}>
                <img src="/images/logo.png" alt="logo" />
            </NavLink>

            <div className={cx('header-sidebar')}>
                {optionList.map((item) =>
                    user && item.name === 'Login' ? (
                        <div key={item.path} className={cx('profile-user')}>
                            <img
                                src={
                                    user.photoURL
                                        ? user.photoURL
                                        : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                                }
                                style={{ borderRadius: '50%' }}
                                witdh="30"
                                height="30"
                                alt=""
                            ></img>
                        </div>
                    ) : (
                        <NavLink to={item.path} key={item.path} className={cx('header-sidebar-item')}>
                            <div className={cx('header-sidebar-icon')}>{<item.icon />}</div>
                            <span>{item.name}</span>
                        </NavLink>
                    ),
                )}
            </div>
        </div>
    );
}

export default Header;
