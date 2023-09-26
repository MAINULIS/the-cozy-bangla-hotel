import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);
// firebase 
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

// 1 Registration
 const createUser = (email, password) =>{
  return createUserWithEmailAndPassword(auth,email,password);
 }
 // 2 login
 const LogIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
 }
    // 3. reset password
    const resetPassword =(email) =>{
       return sendPasswordResetEmail(auth, email);
    }
    // 4. login with google
    const signInWithGoogle = () =>{
       return signInWithPopup(auth, googleProvider);
    }
    // 5. sign in with Github
    const signInWithGithub = () =>{
      return signInWithPopup(auth, GithubProvider);
    }

    // 6 logOut
    const logOut = () =>{
       return signOut(auth);
    }

    // 7. observe auth state change
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        // stop observer while unmounting
        return () => {unsubscribe(); }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        LogIn,
        logOut,
        resetPassword,
        signInWithGoogle,
        signInWithGithub,
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;