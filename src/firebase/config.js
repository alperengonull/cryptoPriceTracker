import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDO-QbFurpPDQ14Jf3ImS5mdvrkviV9J40",
    authDomain: "crytopricetracker.firebaseapp.com",
    projectId: "crytopricetracker",
    storageBucket: "crytopricetracker.appspot.com",
    messagingSenderId: "9027603726",
    appId: "1:9027603726:web:2900b2fcf06c7ae9499b5f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };