import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDufrA7PWu4HhlbP17UGoMphiKkxbsE8mA",
    authDomain: "reactnative-firebase-b828f.firebaseapp.com",
    projectId: "reactnative-firebase-b828f",
    storageBucket: "reactnative-firebase-b828f.appspot.com",
    messagingSenderId: "149038082964",
    appId: "1:149038082964:web:691a820b76a9fc1386fd81",
    measurementId: "G-XXCGQTKC3F"
};
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
};