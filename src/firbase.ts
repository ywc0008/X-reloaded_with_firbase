// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHWV5uWfzOj932hg9u-NsAiXoTSncufMg",
  authDomain: "x-reloaded.firebaseapp.com",
  projectId: "x-reloaded",
  storageBucket: "x-reloaded.appspot.com",
  messagingSenderId: "242919711997",
  appId: "1:242919711997:web:c22c69df8c6ad0da0dca94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);