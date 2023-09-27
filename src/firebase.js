// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD4e_NaeB_mWLYn6nq4vkFw72dqmX6PlE",
  authDomain: "todolist230926.firebaseapp.com",
  projectId: "todolist230926",
  storageBucket: "todolist230926.appspot.com",
  messagingSenderId: "200406174384",
  appId: "1:200406174384:web:006c777f9c6321ec1bc975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);