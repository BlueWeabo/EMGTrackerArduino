// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
 

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
if (window.location.href == "Index.html") {
    if (!tryToLoginStorage()) {
        window.location.href = "Login.html";
    } else {
        window.location.href = "MainPage.html";
    }
}
let user;

function tryToLoginStorage() {
    let email = localStorage.getItem("userEmail");
    if (email == undefined || email == null) return false;
    let pass = localStorage.getItem("userPassword");
    if (pass == undefined || pass == null) return false;
    signInWithEmailAndPassword(auth, email, pass).then(validateCredentials).catch(catchFailure);
    if (user) {
        return true;
    }
    return false;
}

function validateCredentials(credentials) {
    user = credentials.user;
    if (user) {
        window.location.href="MainPage.html"
    }
}

function catchFailure(error) {
    const erC = error.code;
    const erM = error.message;
    let errorArea = document.getElementById("error");
    if (errorArea == null) return;
    errorArea.textContent = erM;
}

if (!tryToLoginStorage()) {
    window.location.href="Login.html";
} else {
    window.location.href="MainPage.html";
}