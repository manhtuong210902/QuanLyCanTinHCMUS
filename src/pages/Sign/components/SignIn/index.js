import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { useForm } from 'react-hook-form';

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/config';

import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const provider = new GoogleAuthProvider();

const cx = classNames.bind(styles);

function SignIn({ handleChangeSign }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (user) => {
        signInWithEmailAndPassword(auth, user.email, user.password).catch((err) => {
            if(err.code === 'auth/invalid-email') {
                toast.error('Email không hợp lệ!');
            } else if(err.code === 'auth/wrong-password') {
                toast.error('Sai mật khẩu!');
            } else {
                toast.error('Đã xảy ra lỗi!');
            }
            console.log(err.code);
        });
    };

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = await GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = await result.user;
                // console.log(user);
                // const q = query(collection(db, "users"), where("email", "==", user.email));
                const q = await query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                // console.log(querySnapshot.empty);
                if (querySnapshot.empty) {
                    try {
                        const docRef = await addDoc(collection(db, 'users'), {
                            name: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            image: user.photoURL,
                            vip: 0,
                            level: 'D',
                            money: 0,
                            admin: false,
                        });
                        console.log('Document written with ID: ', docRef.id);
                    } catch (e) {
                        console.error('Error adding document: ', e);
                    }
                }
                // setPersistence(auth, inMemoryPersistence)
                //     .then(() => {
                //         return signInWithRedirect(auth, provider);
                //     })
                //     .catch((error) => {
                //         // Handle Errors here.
                //         const errorCode = error.code;
                //         const errorMessage = error.message;
                //         console.log(errorCode, errorMessage);
                //     });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode, errorMessage);
            });
    };

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
                            <FcGoogle /> <span>ĐĂNG NHẬP VỚI GOOGLE</span>
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
