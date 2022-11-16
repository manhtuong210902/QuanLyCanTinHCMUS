import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div>
            <div className={cx('footer')}>
                <span>Footer</span>
            </div>
        </div>
    );
};

export default Footer;
