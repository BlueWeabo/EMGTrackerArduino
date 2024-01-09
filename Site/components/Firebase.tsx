'use client'

import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { Dispatch, SetStateAction } from "react";

const firebaseConfig = {

  apiKey: "AIzaSyBFqO7PLGXYErIYjDGzoRqfRpyfILvoJRo",

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
const database = getDatabase(app);
// Initialize authentication
const auth = getAuth(app);

function RealTimeDataBase({setDatabase}:{setDatabase:Dispatch<SetStateAction<Database | null>>}) {

    return (
        <>
            {setDatabase(database)}
        </>
    )
}

function Authentication({setAuth}:{setAuth:Dispatch<SetStateAction<Auth | null>>}) {
    
    return (
        <>
            {setAuth(auth)}
        </>
    )
}

export default RealTimeDataBase;