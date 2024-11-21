import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDjSiDiXbYra4k5j4VgtEKGVze0_tF_8XE",
    authDomain: "clase-2-prueba.firebaseapp.com",
    projectId: "clase-2-prueba",
    storageBucket: "clase-2-prueba.firebasestorage.app",
    messagingSenderId: "606598602855",
    appId: "1:606598602855:web:6579a2cd38936abf55f4c2"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };
