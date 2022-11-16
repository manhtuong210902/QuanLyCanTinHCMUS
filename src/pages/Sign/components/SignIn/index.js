import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

function SignIn({ handleChangeSign }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (user) => {
        console.log(user);
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
                            <input
                                placeholder="Tài khoản"
                                {...register('username', { required: true, minLength: 6 })}
                            />
                            <p>
                                {errors.username?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.username?.type === 'minLength'
                                    ? 'Tài khoản phải có từ 6 kí tự'
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
