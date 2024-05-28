
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAxbvLmuc70_Vj44CIrHs0brzqWA5a-Blc",
  authDomain: "react-notes-74db6.firebaseapp.com",
  projectId: "react-notes-74db6",
  storageBucket: "react-notes-74db6.appspot.com",
  messagingSenderId: "237282673830",
  appId: "1:237282673830:web:9f62a7b05935c4cf1ce067"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")


