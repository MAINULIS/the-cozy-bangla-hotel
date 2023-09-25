import React, { createContext, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);
// firebase 
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);

// 1 Registration
 const createUser = (email, password) =>{
  return createUserWithEmailAndPassword(auth,email,password);
 }
 //  login
 const LogIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
 }
    const authInfo = {
        user,
        createUser,
        LogIn,
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