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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
