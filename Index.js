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
let user = null;

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
}

function defineAuthority(email) {
	let auth = 0;
	if (email.includes("doc")) {
		auth = 1;
	} else if (email.includes("admin")) {
		auth = 2;
	}
	console.log(auth + "auth");
	return auth;
}


if (!tryToLoginStorage()) {
	window.location.href="login.html";
} else {
	const email = localStorage.getItem("userEmail");
	const authLevel = defineAuthority(email);
	localStorage.setItem("auth", authLevel);
	switch (authLevel) {
		case 0:
			window.location.href="mainPage.html";
			break;
		case 1:
			window.location.href="mainPageDoc.html";
			break;
		case 2:
			break;
	}
}