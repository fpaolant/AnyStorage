// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  sendPasswordResetEmail,
  updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl_A7puemjys0ilSXo6W447pnV2VI54_o",
  authDomain: "anystorage-dac72.firebaseapp.com",
  projectId: "anystorage-dac72",
  storageBucket: "anystorage-dac72.appspot.com",
  messagingSenderId: "814783522540",
  appId: "1:814783522540:web:02c839098473e9af6aa7c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTHENTICATION
const fbAuth = getAuth(app);

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(fbAuth, email, password);
}

const signIn = (email, password) => {
  return signInWithEmailAndPassword(fbAuth, email, password);
}

const signOut = () => {
    return fbSignOut(fbAuth);
}

const recoverPasswordEmail = (email) => {
  return  sendPasswordResetEmail(fbAuth, email);
}

const updateDisplayName = (displayName) => {
  return updateProfile(fbAuth.currentUser, {
    displayName
  });
}



export const auth = { signIn, signOut, signUp, recoverPasswordEmail, updateDisplayName };

// FIRESTORE DB
export const db = getFirestore(app);
