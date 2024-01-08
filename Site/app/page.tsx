import Image from 'next/image'
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';
import { getAuth } from '@firebase/auth';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
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

function Login() {
  return (
    <>
      <form>
            <div className="input-group">
                <label >Email:</label>
                <input type="text" name="email" required/>
            </div>
            <div className="input-group">
                <label >Password:</label>
                <input type="password" name="password" required/>
            </div>
            <button type="submit" >Login</button>
      </form>
    </>
  )
}

function Chart({ chartData }) {

  return (
  <>
    <Line
      data={chartData}
      options={{
        
      }}
    >

    </Line>
  </>
  )
}

export default function Home() {
  return (
    <>
      <Login />
    </>
  )
}
