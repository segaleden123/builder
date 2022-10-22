import firebase from "firebase/compat/app";
import 'firebase/auth'
require('firebase/compat/auth')


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDlIRxynSTp-sDNCcxaBu9A50qQ9cRQZng",
  authDomain: "auth---development-92860.firebaseapp.com",
  databaseURL: "https://auth---development-92860-default-rtdb.firebaseio.com",
  projectId: "auth---development-92860",
  storageBucket: "auth---development-92860.appspot.com",
  messagingSenderId: "83828719343",
  appId: "1:83828719343:web:6b4832c6cc1d459845651a"
  
})

export default firebaseConfig;