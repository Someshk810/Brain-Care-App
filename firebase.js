import { initializeApp } from "firebase/app";
import { getAuth ,sendEmailVerification} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//to query database
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAW5BxgW9koEKU7tZlqI0RIC5v4qKx7yNg",
  authDomain: "brain-care-29e1e.firebaseapp.com",
  databaseURL: "https://brain-care-29e1e-default-rtdb.firebaseio.com",
  projectId: "brain-care-29e1e",
  storageBucket: "brain-care-29e1e.appspot.com",
  messagingSenderId: "682029044098",
  appId: "1:682029044098:web:334a8e1b8be6a2e732bf9b"
};

// Initialize Firebase
try{
  const app = initializeApp(firebaseConfig);
}catch(e){
  console.log('error in firebase');
}


//Realtime Database
const db = getDatabase();
export default db;