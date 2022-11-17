import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

const cx = classNames.bind(styles);

function Sidebar() {
    const optionList = [
        {
            name: 'Thực đơn',
            path: '/',
        },
        {
            name: 'Thống kê',
            path: '/statistical',
        },
        {
            name: 'Báo cáo',
            path: '/report',
        },
        {
            name: 'Kho',
            path: '/storage',
        },
        {
            name: 'Nhân viên',
            path: '/employee',
        },
    ];

    const settingList = [
        {
            name: 'Cài đặt',
            path: '/setting',
            icon: AiOutlineSetting,
        },
        {
            name: 'Logout',
            path: '/login',
            icon: BiLogOutCircle,
        },
    ];
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-option')}>
                {optionList.map((item, index) => (
                    <NavLink key={index} className={cx('sidebar-option-item')} to={item.path}>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
            <div className={cx('sidebar-setting')}>
                {settingList.map((item, index) => (
                    <NavLink key={index} to={item.path} className={cx('sidebar-setting-item')}>
                        <div className={cx('sidebar-setting-icon')}>{<item.icon />}</div>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
