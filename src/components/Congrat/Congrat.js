import classNames from 'classnames/bind';
import styles from './Congrat.module.scss';
import { useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';
const cx = classNames.bind(styles);

const Congrat = (props) => {
    useEffect(() => {
        const confettiSettings = { target: 'my-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
    }, []);
    return (
        <div className={cx('modal-page')}>
            <div className={cx('content')}>
                <p>Chúc mừng bạn đã là khách hàng Vip bậc {props.vipType}</p>
                <p>Ưu đãi khi mua hàng là giảm {props.vipType === 'C' ? '3%' : props.vipType === 'B' ? '5%' : '10%'}</p>
                <button className={cx('btn')} onClick={() => props.changeCongrat(false)}>
                    OK
                </button>
            </div>
            <canvas className={cx('my-canvas')} id="my-canvas"></canvas>
        </div>
    );
};
export default Congrat;
