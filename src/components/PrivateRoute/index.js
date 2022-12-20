import { Navigate, Outlet } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

function PrivateRoute() {
    async function checkIsAdmin(userEmail) {
        if (userEmail) {
            const q = await query(collection(db, 'users'), where('email', '==', userEmail), where('admin', '==', true));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return true;
            } else {
                return false;
            }
        }
    }

    console.log('private route');
    const isAdmin = checkIsAdmin(auth.currentUser?.email);
    return auth.currentUser && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
