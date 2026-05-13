import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB4LbUGbl2O8TxHcBlKeZq63pFZrvFcGM",
  authDomain: "portfolio-fab3b.firebaseapp.com",
  projectId: "portfolio-fab3b",
  storageBucket: "portfolio-fab3b.firebasestorage.app",
  messagingSenderId: "347096073947",
  appId: "1:347096073947:web:5e950915e99298ea182efe"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
