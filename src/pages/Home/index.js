import React from 'react';
import Content from '../../components/Content';
import Order from '../../components/Order';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('Home')}>
            <Content />
            <Order />
        </div>
    );
};

export default Home;
