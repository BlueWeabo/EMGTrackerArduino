// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
 

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

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

const auth = getAuth(app);
const user = null;

function tryToLoginStorage() {
    let email = localStorage.getItem("userEmail");
    if (email == undefined || email == null) return false;
    let pass = localStorage.getItem("userPassword");
    if (pass == undefined || pass == null) return false;
    signInWithEmailAndPassword(auth, email, pass).then(validateCredentials);
    console.log(user);
    if (typeof user !== 'undefined' || user !== null) return true;
    return false;
}

function validateCredentials(credentials) {
    console.log(credentials.user);
    user = credentials.user;
    if (user && window.location.href != "MainPage.html") {
        window.location.href="MainPage.html"
    }
}

if (!tryToLoginStorage()) {
    window.location.href="Login.html";
}