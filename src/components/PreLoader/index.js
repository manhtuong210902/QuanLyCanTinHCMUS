import styles from './PreLoader.module.scss';
import classNames from 'classnames/bind';
import { Spinner } from 'react-bootstrap';

const cx = classNames.bind(styles);

function PreLoader() {
    return (
        <div className={cx('wrapper')}>
            <Spinner className={cx('spinner')} animation="border" variant="light" />
        </div>
    );
}

export default PreLoader;
