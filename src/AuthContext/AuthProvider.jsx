import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user , setUser ]= useState(null)
    const [loading , setLoading] = useState(true)


    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn =(email , password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut =()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth , currentUser=>{
            setUser(currentUser)
            setLoading(false)
            
        })
        return ()=>{
            unSubscribe();
        }

    },[])

    const signInGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,provider)

    }
    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInGoogle
        
    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
            
        </div>
    );
};

export default AuthProvider;