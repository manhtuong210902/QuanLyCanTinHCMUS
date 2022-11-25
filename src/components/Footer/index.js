import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <NavLink to="/" className={cx('header-logo')}>
                <img src="/images/logo.png" alt="logo" />
            </NavLink>
            <div className={cx('footer-content')}>
                <span>copyright © group 29 - Nhập môn công nghệ phần mềm 20_1 - HCMUS</span>
            </div>
        </div>
    );
};

export default Footer;
