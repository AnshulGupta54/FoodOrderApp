// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo5QBSou3FSRpbxqFs-4b09BTcEDWySiM",
  authDomain: "food-order-app-8a8b2.firebaseapp.com",
  databaseURL: "https://food-order-app-8a8b2-default-rtdb.firebaseio.com",
  projectId: "food-order-app-8a8b2",
  storageBucket: "food-order-app-8a8b2.appspot.com",
  messagingSenderId: "604709563915",
  appId: "1:604709563915:web:cd550f6a804194e397e10e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;
