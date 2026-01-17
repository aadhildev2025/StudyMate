import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For now, these are placeholders. The user needs to replace them or set env vars.
const firebaseConfig = {
    apiKey: "AIzaSyCaHd2fznk7iFf1_IoEdoKZpJZkkZ0AuhQ",
    authDomain: "studymate-fcfc3.firebaseapp.com",
    projectId: "studymate-fcfc3",
    storageBucket: "studymate-fcfc3.firebasestorage.app",
    messagingSenderId: "577527073841",
    appId: "1:577527073841:web:87e5ed21a106490e71d910",
    measurementId: "G-8N7CCH96Q2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
