'use client'

import Image from 'next/image'
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';
import { getAuth } from '@firebase/auth';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Dispatch, FormEvent, FormEventHandler, useState } from "react";
import { Line } from 'react-chartjs-2';
import { signInWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {

  apiKey: "AIzaSyBFqO7PLGXYErIYjDGzoRqfRpyfILvoJRo",

  authDomain: "emgtrackerarduino.firebaseapp.com",

  databaseURL: "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "emgtrackerarduino",

  storageBucket: "emgtrackerarduino.appspot.com",

  messagingSenderId: "170521093559",

  appId: "1:170521093559:web:2a479039c5179ae42f7432"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
// Initialize authentication
const auth = getAuth(app);

function Login({setLoginState}) {
  function handleSubmit(event : FormEvent) {
    event.preventDefault();
    const {email, password} = document.forms[0];
    signInWithEmailAndPassword(auth,email.value,password.value).then((userCred)=>{
      const user = userCred.user;
      if (user) {
        setLoginState(true);
      }
    }).catch((reason)=>{
      setLoginState(false);
    });
    return true;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor='email'>Email:</label>
                <input type="text" id="email" name="email" required/>
            </div>
            <div className="input-group">
                <label htmlFor='password'>Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit" >Login</button>
      </form>
    </>
  )
}

function Menu() {
  return (
    <>

    </>
  )
}

function LChart({ chartData }) {

  return (
  <>
    <Line
      data={chartData}
      options={{}}
    >
    </Line>
  </>
  )
}

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  return (
    <>
      {isLoggedIn ? <Menu /> : <Login setLoginState={setLoggedIn}/>}
    </>
  )
}
