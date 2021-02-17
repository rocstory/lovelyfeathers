import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTFOBGimitL1oxYf4Mtzf4ABqir8_IWTM",
    authDomain: "lovelyfeathers4.firebaseapp.com",
    projectId: "lovelyfeathers4",
    storageBucket: "lovelyfeathers4.appspot.com",
    messagingSenderId: "769390261168",
    appId: "1:769390261168:web:c3205b417acd75bd671c75",
    measurementId: "G-CXS5SZFHZR"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
