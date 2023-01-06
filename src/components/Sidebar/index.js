import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi';

import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const optionList = [
        {
            id: 1,
            name: 'Thực đơn',
            path: '/',
            admin: false,
        },
        {
            id: 2,
            name: 'Thống kê',
            path: '/statistical',
            admin: true,
        },
        {
            id: 3,
            name: 'Báo cáo',
            path: '/report',
            admin: true,
        },
        {
            id: 4,
            name: 'Kho',
            path: '/storage',
            admin: true,
        },
        {
            id: 5,
            name: 'Nhân viên',
            path: '/employee',
            admin: true,
        },
    ];

    const settingList = [
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

    const [isClickLogout, setIsClickLogout] = useState(false);

    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const handleClickLogout = (e) => {
        e.preventDefault();
        setIsClickLogout(true);
        auth.signOut();
    };

    async function checkIsAdmin(userEmail) {
        if (userEmail) {
            const q = await query(collection(db, 'users'), where('email', '==', userEmail), where('admin', '==', true));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(auth.currentUser);
            if (auth.currentUser) {
                checkIsAdmin(auth.currentUser.email);
            }
            if (isClickLogout) {
                setCurrentUser(null);
                navigate('/sign');
            }
        });
    }, [isClickLogout, navigate]);

    useEffect(() => {
        console.log('render sidebar');
    }, []);

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-option')}>
                {isAdmin ? (
                    optionList.map((item) => (
                        <NavLink
                            key={item.id}
                            className={
                                location.pathname === item.path
                                    ? cx('sidebar-option-item', 'active')
                                    : cx('sidebar-option-item')
                            }
                            to={item.path}
                        >
                            <span>{item.name}</span>
                        </NavLink>
                    ))
                ) : (
                    <NavLink className={cx('sidebar-option-item', 'active')} to={'/'}>
                        <span>Thực Đơn</span>
                    </NavLink>
                )}
            </div>
            <div className={cx('sidebar-setting')}>
                {settingList.map((item, index) =>
                    auth.currentUser ? (
                        item.name === 'Đăng xuất' ? (
                            <NavLink key={index} onClick={handleClickLogout} className={cx('sidebar-setting-item')}>
                                <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                                <span>{item.name}</span>
                            </NavLink>
                        ) : (
                            <NavLink key={index} to={item.path} className={cx('sidebar-setting-item')}>
                                <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    ) : (
                        ''
                    ),
                )}
            </div>
        </div>
    );
}

export default Sidebar;
