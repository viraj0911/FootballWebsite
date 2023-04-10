import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKhCPIiXhZlKYaavRaPjDHTJMwzwJ1nl8",
  authDomain: "football-website-5a8cc.firebaseapp.com",
  databaseURL: "https://football-website-5a8cc-default-rtdb.firebaseio.com",
  projectId: "football-website-5a8cc",
  storageBucket: "football-website-5a8cc.appspot.com",
  messagingSenderId: "331330882913",
  appId: "1:331330882913:web:93c644171383d9ecef0920",
  measurementId: "G-PH0DQYKGTP"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
export const database = firebase.database();