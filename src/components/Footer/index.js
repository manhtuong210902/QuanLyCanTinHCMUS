import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-logo')}>
                <NavLink to={'/'} className={cx('home-btn')}>
                    29
                </NavLink>
            </div>
            <div className={cx('footer-info')}>Footer</div>
        </div>
    );
};

export default Footer;
