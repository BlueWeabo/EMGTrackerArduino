import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
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
const authLevel = localStorage.getItem("auth");
const auth = getAuth(app);

if (authLevel != 2) {
	localStorage.setItem("userEmail", "");
	localStorage.setItem("userPassword", "");
	localStorage.setItem("auth", -1);
	window.location.href="login.html";
}

function getAccountName(email) {
	const usr = email.split('@')[0];
	const user = usr.split('\.');
	return ''+capitalizeFirstLetter(user[0])+' '+capitalizeFirstLetter(user[1]);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("createDoctor").addEventListener("click",
function(event) {
	let email = document.getElementById("newDoctorEmail").value;
	let pass = document.getElementById("newDoctorPassword").value;
	let passConfirm = document.getElementById("newDoctorPasswordConfirm").value;
	if (passConfirm !== pass) {
		document.getElementById("error").textContent = "Not the same password. Try again";
		return;
	}
	createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
		const user = userCredential.user;
		set(ref(database, 'Muscle Biometrics/' + getAccountName(email)), {
			Current: 0,
			Monday: {
				Hour2:[1,2,3,4,5,6,7,8,9],
				Hour10:[1,2,3,4,5,6,7,8,9],
				Hour17:[1,2,3,4,5,6,7,8,9]
			},
			Sunday:{
				Hour2:[1,2,3,4,5,6,7,8,9],
				Hour10:[1,2,3,4,5,6,7,8,9],
				Hour17:[1,2,3,4,5,6,7,8,9]
			}
		});
		document.getElementById("error").textContent = "Success";
	}).catch((error) => {
		document.getElementById("error").textContent = error.message;
	});
})

document.getElementById("logout").addEventListener("click",
function(event) {
	signOut(auth).then(() => {
		localStorage.setItem("userEmail", "");
		localStorage.setItem("userPassword", "");
		localStorage.setItem("auth", -1);
		window.location.href = "login.html";
	}).catch((error)=>{}) // do nothing on fail i guess
});