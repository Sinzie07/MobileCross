// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwd99DeghkCvXCw54OH1eLuOicdtroURU",
  authDomain: "week10-mobilecross.firebaseapp.com",
  projectId: "week10-mobilecross",
  storageBucket: "week10-mobilecross.appspot.com",
  messagingSenderId: "606509369803",
  appId: "1:606509369803:web:1db209333bc89d4eeb4e4e",
  measurementId: "G-C2FWF8KD0R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
