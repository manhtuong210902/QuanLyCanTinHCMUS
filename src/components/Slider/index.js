import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);

const Slider = () => {
    const slider = [
        {
            title: `You don't need a silver fork to eat good food `,
            image: '/images/slider1.png',
        },
    ];
    return (
        <div className={cx('Slider')}>
            <div className={cx('Slider-image')}>
                <div className={cx('Slider-title')}>
                    <span>{slider[0].title}</span>
                </div>
                <div className={cx('Slider-image-round')}>
                    <img src={slider[0].image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Slider;
