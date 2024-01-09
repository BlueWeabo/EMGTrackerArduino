'use client'
import Image from 'next/image'
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';
import { getAuth } from '@firebase/auth';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Dispatch, FormEvent, FormEventHandler, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import Login from '@/pages/LoginForm';
import RealTimeDataBase from '@/components/Firebase';
import { Database } from 'firebase/database';

const firebaseConfig = {

  apiKey: "AIzaSyBFqO7PLGXYErIYjDGzoRqfRpyfILvoJRo",

  authDomain: "emgtrackerarduino.firebaseapp.com",

  databaseURL: "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "emgtrackerarduino",

  storageBucket: "emgtrackerarduino.appspot.com",

  messagingSenderId: "170521093559",

  appId: "1:170521093559:web:2a479039c5179ae42f7432"

};
console.log(process.env.NEXT_PUBLIC_FIREBASE_API);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
// Initialize authentication
const auth = getAuth(app);

function Menu() {
  return (
    <>
      <div>Successfully Logged In</div>
    </>
  )
}


export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [database, setDatabase] = useState<Database | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null);
  
  return (
    <>
      {isLoggedIn ? <Menu /> : <Login setLoginState={setLoggedIn} auth={auth}/>}
    </>
  )
}
