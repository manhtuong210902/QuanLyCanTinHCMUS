import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { useForm } from 'react-hook-form';

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/config';

import {FcGoogle} from 'react-icons/fc';

const provider = new GoogleAuthProvider();

const cx = classNames.bind(styles);

function SignIn({ handleChangeSign }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (user) => {
        signInWithEmailAndPassword(auth, user.email, user.password);
    };

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async(result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // console.log(user);
                try {
                    const docRef = await addDoc(collection(db, 'users'), {
                        email: user.email,
                        uid: user.uid,
                        admin: false,
                    });
                    console.log('Document written with ID: ', docRef.id);
                } catch (e) {
                    console.error('Error adding document: ', e);
                }
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className={cx('login')}>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h2>ĐĂNG NHẬP</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <label>Tài khoản</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="Email" {...register('email', { required: true, minLength: 6 })} />
                            <p>
                                {errors.email?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.email?.type === 'minLength'
                                    ? 'Email phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        <button className={cx('submit')} type="submit">
                            ĐĂNG NHẬP
                        </button>
                        <span onClick={handleSignInWithGoogle} className={cx('google')}>
                            <FcGoogle/> <span>ĐĂNG NHẬP VỚI GOOGLE</span>
                        </span>
                        <button onClick={handleChangeSign} className={cx('signup')}>
                            Bạn chưa có tài khoản?
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
