// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2QPmndab1RTwvcxF0tbIUObnhBI3Ry-0",
  authDomain: "the-cozy-bangla-hotel.firebaseapp.com",
  projectId: "the-cozy-bangla-hotel",
  storageBucket: "the-cozy-bangla-hotel.appspot.com",
  messagingSenderId: "429546174426",
  appId: "1:429546174426:web:08468429c65dc3353d32e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;