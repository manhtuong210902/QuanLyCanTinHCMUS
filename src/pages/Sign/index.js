import styles from './Sign.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect, useRef } from 'react';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import canteen1 from './img/canteen1.jpg';
import canteen2 from './img/canteen2.jpg';
import canteen3 from './img/canteen3.jpg';

const cx = classNames.bind(styles);

const second = 3;
const listSlideImg = [canteen1, canteen2, canteen3];

function Sign() {
    const [isSignIn, setIsSignIn] = useState(true);

    const [slideImg, setSlideImg] = useState(0);

    const imgRef = useRef();

    useEffect(() => {
        let timer1;
        if(slideImg === listSlideImg.length - 1) {
            timer1 = setTimeout(() => setSlideImg(0), second * 1000);
        } else {
            timer1 = setTimeout(() => setSlideImg(slideImg + 1), second * 1000);
        }

        return () => {
            clearTimeout(timer1);
        };
    }, [slideImg]);

    const handleChangeSign = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}>
                <img ref={imgRef} className={cx('img')} src={listSlideImg[slideImg]} alt="img" />
            </div>
            <div className={cx('sign')}>
                {isSignIn ? (
                    <SignIn handleChangeSign={handleChangeSign} />
                ) : (
                    <SignUp handleChangeSign={handleChangeSign} />
                )}
            </div>
        </div>
    );
}

export default Sign;
