// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import only if needed
// import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa1jbYYl62ZSTMBbMsHttqd2CoBceg6fE",
  authDomain: "senseipay-62e57.firebaseapp.com",
  databaseURL: "https://senseipay-62e57-default-rtdb.firebaseio.com",
  projectId: "senseipay-62e57",
  storageBucket: "senseipay-62e57.firebasestorage.app",
  messagingSenderId: "383816674374",
  appId: "1:383816674374:web:87b95015de196ba61a2e47",
  measurementId: "G-9QWDJG6S2X" // Optional
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Uncomment if you use analytics
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
