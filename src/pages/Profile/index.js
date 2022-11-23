import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc,query, where, getDocs,deleteDoc,doc} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/config';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import PreLoader from '../../components/PreLoader';
import { async } from '@firebase/util';


const cx = classNames.bind(styles);

function Profile() {
    const user=auth.currentUser
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [money,setMoney]=useState()
    const [isN,setN]=useState(false)
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
    const changeMoney=async(id)=>{
        const q = query(collection(db, "users"), where("uid", "==", id));
            const querySnapshot = await getDocs(q);
            let docID = '';
            let updateUser=''
            querySnapshot.forEach((doc) => {
            docID = doc.id;
            updateUser=doc.data()
            });
            await deleteDoc(doc(db, "users", docID));
            updateUser.money=parseInt( updateUser.money)+parseInt( money)
            console.log(updateUser)
            addDoc(collection(db,'users'),updateUser)
            setCurrentUser(updateUser)
            return updateUser
    }

    return (
        <div>
            {isN? <div className={cx('wrapper')}>
                <div className={cx('bank')}>
                <label for="banks">Chọn ngân hàng   :</label>
                <select name="banks" id="banks">
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="BIDV">BIDV</option>
                    <option value="Sacombank">Sacombank</option>
                    <option value="Agribank">Agribank</option>
                </select>
                <input className={cx('box')} placeholder='Nhập số tài khoản'/>
                <input className={cx('box')} placeholder='Nhập số tiền cần nạp' value={money} onChange={(e)=>setMoney(e.target.value)}/>
                <div className={cx('btn-list')}>
                    <div className={cx('btn')} onClick={()=>{
                        setN(false)
                        setMoney('')
                        }}>
                        Quay lại
                    </div>
                    <div className={cx('btn')} onClick={()=>{
                        setN(false)
                        let updateUser=''
                        changeMoney(user.uid).then((data)=>{
                        })
                        
                        setMoney('')
                        }}>Oke</div>
                </div>
                </div>
            </div> 
            : isAdmin ? (
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
                            <p onClick={()=>{
                                setN(true)
                            }}>Nạp tiền</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
