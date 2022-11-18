import styles from './PreLoader.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PreLoader() {
    return (
        <div className={cx('wrapper')}>
            <img src="/images/logo.png" alt="" className={cx('image')} />
        </div>
    );
}

export default PreLoader;
