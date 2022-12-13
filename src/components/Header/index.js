import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiStore } from 'react-icons/bi';
import { BsList } from 'react-icons/bs';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi';
const cx = classNames.bind(styles);

function Header() {
    const optionList = [
        {
            name: 'Home',
            path: '/',
            icon: FaHome,
        },
        {
            name: 'History',
            path: '/sales',
            icon: BiStore,
        },
        {
            name: 'Login',
            path: '/sign',
            icon: RiLoginCircleLine,
        },
    ];

    const settingList = [
        {
            name: 'Thực đơn',
            path: '/',
            icon: FaHome,
        },
        {
            name: 'Lịch sử',
            path: '/sales',
            icon: BiStore,
        },
        {
            name: 'Cá nhân',
            path: '/profile',
            icon: BiUserCircle,
            admin: false,
        },
        {
            name: 'Đăng xuất',
            path: '/sign',
            icon: BiLogOutCircle,
            admin: false,
        },
    ];

    const navigate = useNavigate();
    const user = auth.currentUser;
    const [showMenu, setShowMenu] = useState(false);
    const [isClickLogout, setIsClickLogout] = useState(false);

    function handleToggleMenu() {
        setShowMenu(!showMenu);
    }

    function handleClickLogout(e) {
        e.preventDefault();
        setIsClickLogout(true);
        auth.signOut();
    }

    useEffect(() => {
        if (isClickLogout) {
            navigate('/sign');
        }
    }, [isClickLogout, navigate]);

    return (
        <div className={cx('header')}>
            <NavLink to="/" className={cx('header-logo', 'd-none d-lg-flex')}>
                <img src="/images/logo.png" alt="logo" />
            </NavLink>

            <button className={cx('toggle-menu-btn', 'd-lg-none')} onClick={handleToggleMenu}>
                <BsList />
            </button>

            <div className={cx('header-sidebar', 'd-none d-lg-flex')}>
                {optionList.map((item) =>
                    user && item.name === 'Login' ? (
                        <Link to={'/profile'} key={item.path}>
                            <div className={cx('profile-user')}>
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
                        </Link>
                    ) : (
                        <NavLink to={item.path} key={item.path} className={cx('header-sidebar-item')}>
                            <div className={cx('header-sidebar-icon')}>{<item.icon />}</div>
                            <span>{item.name}</span>
                        </NavLink>
                    ),
                )}
            </div>

            <div className="d-lg-none">
                {user ? (
                    <Link to={'/profile'}>
                        <div className={cx('profile-user')}>
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
                    </Link>
                ) : (
                    <NavLink to="/sign" className={cx('header-sidebar-item')}>
                        <div className={cx('header-sidebar-icon')}>
                            <RiLoginCircleLine />
                        </div>
                        <span>Login</span>
                    </NavLink>
                )}
            </div>

            {/* show menu mobile */}
            {showMenu && (
                <>
                    <div className={cx('nav-modal')} onClick={handleToggleMenu}></div>
                    <div className={cx('nav-mobile')}>
                        <header className={cx('nav-header')}>
                            <div>
                                <Link to="/" className={cx('header-logo')}>
                                    <img src="/images/logo.png" alt="logo" />
                                </Link>
                            </div>
                            <button className={cx('nav-close-btn')} onClick={handleToggleMenu}>
                                <AiOutlineCloseCircle />
                            </button>
                        </header>
                        <ul className={cx('nav-mobile-list')}>
                            {user ? (
                                <>
                                    {settingList.map((item, index) => {
                                        return (
                                            <li className={cx('nav-mobile-item')} key={index}>
                                                {item.name === 'Đăng xuất' ? (
                                                    <NavLink
                                                        key={index}
                                                        onClick={handleClickLogout}
                                                        className={cx('sidebar-setting-item')}
                                                    >
                                                        <div className={cx('sidebar-setting-icon')}>
                                                            {<item.icon />}
                                                        </div>
                                                        <span>{item.name}</span>
                                                    </NavLink>
                                                ) : (
                                                    <NavLink
                                                        key={index}
                                                        to={item.path}
                                                        className={cx('sidebar-setting-item')}
                                                    >
                                                        <div className={cx('sidebar-setting-icon')}>
                                                            {<item.icon />}
                                                        </div>
                                                        <span>{item.name}</span>
                                                    </NavLink>
                                                )}
                                            </li>
                                        );
                                    })}
                                </>
                            ) : (
                                <li className={cx('nav-mobile-item')}>
                                    <Link to={'/'} className={cx('sidebar-setting-item')}>
                                        <div className={cx('sidebar-setting-icon')}>
                                            <FaHome />
                                        </div>
                                        <span>Thực đơn</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
