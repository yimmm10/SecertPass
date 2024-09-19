import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKWto8uWiqrC-eso2txAcersWrWWIkptY",
  authDomain: "project203-30d94.firebaseapp.com",
  projectId: "project203-30d94",
  storageBucket: "project203-30d94.appspot.com",
  messagingSenderId: "280189604101",
  appId: "1:280189604101:web:dc319e669625930f49676c",
  measurementId: "G-H297V9T3ZV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
auth.useDeviceLanguage();

export { auth, firestore };