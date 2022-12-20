import React, { memo } from 'react';
import FoodItem from '../FoodItem';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Table from '../../pages/Table/Table';
import { Container, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);
const Content = (props) => {
    return (
        <div className={cx('Content')}>
            {props.check ? (
                <div className={cx('dialog')}>
                    <Table changeDesk={props.changeDesk} changeTime={props.changeTime} />
                </div>
            ) : (
                <div className={cx('content-menu')}>
                    <h2>Menu</h2>
                    <Container className={cx('menu')}>
                        <Row>
                            {props.foods.map((food, index) => (
                                // <div className={cx('content-menu-item')}>
                                <FoodItem food={food} key={index} handleClick={props.handleClick} />
                                // </div>
                            ))}
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default memo(Content);
