import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const key = process.env.REACT_APP_FIREBASE_TOKEN

const firebaseConfig = {
    apiKey: 'AIzaSyAzrv1xEDLXE_H42y4PbKbnYfNrMshGvrU',
    authDomain: "slamthedragondb.firebaseapp.com",
    databaseURL: "https://slamthedragondb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "slamthedragondb",
    storageBucket: "slamthedragondb.appspot.com",
    messagingSenderId: "197882433510",
    appId: "1:197882433510:web:3c3a4109a51bd4bd24d027",
    measurementId: "G-B5QDPCS9GN"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app)
export const db = getDatabase(app);