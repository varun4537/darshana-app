import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// These should be updated with actual values from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDMLMnkNKjLw0pLz9q0j3O8_zCe6q_uw0c",
    authDomain: "darshana-84a9d.firebaseapp.com",
    projectId: "darshana-84a9d",
    storageBucket: "darshana-84a9d.firebasestorage.app",
    messagingSenderId: "232212512126",
    appId: "1:232212512126:web:aebd78ea936fa34787872f"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
