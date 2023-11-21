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
if (window.location.href == "Index.html") {
    if (!tryToLoginStorage()) {
        window.location.href = "Login.html";
    } else {
        window.location.href = "MainPage.html";
    }
}
let password = "";
let user;
document.getElementById("loginForm").addEventListener("submit", 
function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email == undefined || email == null) return;
    let pass = document.getElementById("password").value;
    if (pass == undefined || pass == null) return;
    password = pass;
    signInWithEmailAndPassword(auth, email, password).then(validateCredentials).catch(catchFailure);
});

function validateCredentials(credentials) {
    user = credentials.user;
    if (user) {
        window.location.href="MainPage.html";
        localStorage.setItem("userEmail", user.email != null ? user.email : "");
        localStorage.setItem("userPassword", password);
    }
}

function catchFailure(error) {
    document.getElementById("error-message").textContent = error.message;
}

export let finalUser = user;