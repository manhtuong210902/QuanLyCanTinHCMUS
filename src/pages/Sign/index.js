import styles from './Sign.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const cx = classNames.bind(styles);

function Sign() {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleChangeSign = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}></div>
            {isSignIn ? <SignIn handleChangeSign={handleChangeSign} /> : <SignUp handleChangeSign={handleChangeSign} />}
        </div>
    );
}

export default Sign;
