import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {

  apiKey: process.env.FIREBASE_KEY, 

  authDomain: "emgtrackerarduino.firebaseapp.com",

  databaseURL: "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "emgtrackerarduino",

  storageBucket: "emgtrackerarduino.appspot.com",

  messagingSenderId: "170521093559",

  appId: "1:170521093559:web:2a479039c5179ae42f7432"

};
console.log(process.env.FIREBASE_API);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const databasePromise = getDatabase(app);
// Initialize authentication
const authPromise = getAuth(app);

export {databasePromise, authPromise};