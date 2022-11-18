import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import { BiStore } from 'react-icons/bi';
import { auth } from '../../firebase/config';
import { getAuth } from 'firebase/auth';
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
    const auth=getAuth()
    const user=auth.currentUser
    // if(user)
    //      console.log(user.providerData)
    return (
        <div className={cx('header')}>
            <NavLink to="/" className={cx('header-logo')}>
                <img src="/images/logo.png" alt="logo" />
            </NavLink>

            <div className={cx('header-sidebar')}>
                {optionList.map((item) => (
                    user && item.name=='Login' ?
                        <div className={cx('profile-user')}>
                            <img src={user.photoURL?user.photoURL:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fvtv.vn%2Fbong-da-quoc-te%2Fmessi-dinh-chan-thuong-lo-tran-dau-cuoi-tuan-voi-psg-20221008114508247.htm&psig=AOvVaw3o_fsZoPcvvup7CdygiqVQ&ust=1668831237077000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIjWjfrutvsCFQAAAAAdAAAAABAL"} style={{borderRadius:"50%"}}  witdh="50"  height="50"></img>
                        </div>
                    : <NavLink to={item.path} key={item.path} className={cx('header-sidebar-item')}>
                        <div className={cx('header-sidebar-icon')}>{<item.icon />}</div>
                        <span>{item.name}</span>

                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Header;
