import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth from Firebase SDK
import { getFirestore } from "firebase/firestore"; // Import Firestore from Firebase SDK

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKw3K-mFeRSOkmRGi57sFH9DLP_tXtv0",
  authDomain: "sentiment-116.firebaseapp.com",
  projectId: "sentiment-116",
  storageBucket: "sentiment-116.firebasestorage.app",
  messagingSenderId: "618471339681",
  appId: "1:618471339681:web:796463c954cf485ec6a2e0",
  measurementId: "G-VMZYX3GTZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app); // Firebase authentication instance
const db = getFirestore(app); // Firestore instance

// Export the services to use in other parts of the app
export { auth, db }; // Export both auth and db
