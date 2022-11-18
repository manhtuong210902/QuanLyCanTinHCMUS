import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

function PrivateRoute() {
    async function checkIsAdmin(userEmail) {
        if (userEmail) {
            const q = await query(collection(db, 'users'), where('email', '==', userEmail), where('admin', '==', true));
            const querySnapshot = await getDocs(q);
            console.log(!querySnapshot.empty);
            if (!querySnapshot.empty) {
                return true;
            } else {
                return false;
            }
        }
    }

    const isAdmin = checkIsAdmin(auth.currentUser?.email);

    console.log('abcd', auth.currentUser, isAdmin);

    return (auth.currentUser && isAdmin) ? <Outlet/> : <Navigate to='/'/>;
}

export default PrivateRoute;