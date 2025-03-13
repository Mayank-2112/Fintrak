// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fintrak-2112.firebaseapp.com",
  projectId: "fintrak-2112",
  storageBucket: "fintrak-2112.firebasestorage.app",
  messagingSenderId: "776925889568",
  appId: "1:776925889568:web:1bf8c0abf7c03c61276845",
  measurementId: "G-TLCCNHQ7YJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
