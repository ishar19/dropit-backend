import { initializeApp } from "firebase/app";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config() 
const firebaseConfig = {
    apiKey : process.env.apiKey,
    authDomain : process.env.authDomain,
    projectId : process.env.projectId,
    storageBucket : process.env.storageBucket,
    messagingSenderId : process.env.messagingSenderId,
    appId : process.env.appId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;