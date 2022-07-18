// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 export const firebaseConfig = {
  apiKey: 'AIzaSyCidM5QgGgRlFs15GRiMI-gjCDc4XZWhC8',
  authDomain: 'weather-mania-8e88e.firebaseapp.com',
  projectId: 'weather-mania-8e88e',
  storageBucket: 'weather-mania-8e88e.appspot.com',
  messagingSenderId: '315207485474',
  appId: '1:315207485474:web:b0eba0e2320d597c93e27b',
  measurementId: 'G-SE85HSV3TE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
