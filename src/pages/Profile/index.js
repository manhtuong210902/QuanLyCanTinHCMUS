import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/config';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import PreLoader from '../../components/PreLoader';

const cx = classNames.bind(styles);

function Profile() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkIsAdmin(userEmail) {
        if (userEmail) {
            const q = await query(collection(db, 'users'), where('email', '==', userEmail));
            const querySnapshot = await getDocs(q);
            const user = querySnapshot.docs.at(0).data();
            setCurrentUser(user);
            if (user.admin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(auth.currentUser);
            if (auth.currentUser) {
                checkIsAdmin(auth.currentUser.email);
            }
        });
    }, []);

    if (loading) {
        return <PreLoader />;
    }

    return (
        <div>
            {isAdmin ? (
                <div className={cx('wrapper')}>
                    <div className={cx('profile')}>
                        <img src={currentUser.image} alt="" className={cx('avatar')} />
                        <div className={cx('item')}>
                            <p>
                                <b>Tên nhân viên: </b>
                                {currentUser.name}
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <p>
                                <b>Email: </b>
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('profile')}>
                        <img src={currentUser.image} alt="" className={cx('avatar')} />
                        <div className={cx('item')}>
                            <p>
                                <b>Tên: </b>
                                {currentUser.name}
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <p>
                                <b>Email: </b>
                                {currentUser.email}
                            </p>
                        </div>
                        <div className={cx('item')}>
                            <p>
                                <b>Ví: </b>
                                {currentUser.money}
                            </p>
                        </div>
                        <div className={cx('item', 'btnRecharge')}>
                            <p>Nạp tiền</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
