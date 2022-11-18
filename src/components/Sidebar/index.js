import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const optionList = [
        {
            name: 'Thực đơn',
            path: '/',
            admin: false,
        },
        {
            name: 'Thống kê',
            path: '/statistical',
            admin: true,
        },
        {
            name: 'Báo cáo',
            path: '/report',
            admin: true,
        },
        {
            name: 'Kho',
            path: '/storage',
            admin: true,
        },
        {
            name: 'Nhân viên',
            path: '/employee',
            admin: true,
        },
    ];

    const settingList = [
        {
            name: 'Cài đặt',
            path: '/setting',
            icon: AiOutlineSetting,
            admin: false,
        },
        {
            name: 'Logout',
            path: '/sign',
            icon: BiLogOutCircle,
            admin: false,
        },
    ];

    const [isClickLogout, setIsClickLogout] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

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

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-option')}>
                {optionList.map((item, index) =>
                    item.admin ? (
                        isAdmin ? (
                            <NavLink key={index} className={cx('sidebar-option-item')} to={item.path}>
                                <span>{item.name}</span>
                            </NavLink>
                        ) : (
                            ''
                        )
                    ) : (
                        <NavLink key={index} className={cx('sidebar-option-item')} to={item.path}>
                            <span>{item.name}</span>
                        </NavLink>
                    ),
                )}
            </div>
            {/* <NavLink key={index} onClick={handleClickLogout} className={cx('sidebar-setting-item')}>
                                <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                                <span>{item.name}</span>
                            </NavLink> */}
            <div className={cx('sidebar-setting')}>
                {settingList.map((item, index) =>
                    item.name === 'Logout' ? (
                        auth.currentUser ? (
                            <NavLink key={index} onClick={handleClickLogout} className={cx('sidebar-setting-item')}>
                                <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                                <span>{item.name}</span>
                            </NavLink>
                        ) : (
                            ''
                        )
                    ) : (
                        <NavLink key={index} to={item.path} className={cx('sidebar-setting-item')}>
                            <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                            <span>{item.name}</span>
                        </NavLink>
                    ),
                )}
            </div>
        </div>
    );
}

export default Sidebar;
