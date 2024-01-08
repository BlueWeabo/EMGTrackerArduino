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
let user = null;
const data = new Array(100);
let read = 0;
let lenght = 1000;

if (authLevel != 1) {
	localStorage.setItem("userEmail", "");
	localStorage.setItem("userPassword", "");
	localStorage.setItem("auth", -1);
	window.location.href="login.html";
}
function addData(chart, newData) {
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(newData);
	});
	chart.update();
}

let unsub;
function changeBiometrics(field) {
	if (typeof unsub !== 'undefined') {
		unsub();
		data.fill(0);
	}
	unsub = onValue(ref(database, `Muscle Biometrics/${field}/Current`), (snapshot) => {
		let dat = snapshot.val();
		data.shift();
		data[99] = dat;
		addData(myChart, data);
		//console.log(data);
	});
}

function getAccountName(email) {
	const usr = email.split('@')[0];
	const user = usr.split('\.');
	return ''+capitalizeFirstLetter(user[0])+' '+capitalizeFirstLetter(user[1]);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const myChart = new Chart(document.getElementById('myChart').getContext("2d"), {
	type: "line",
	data: {
		labels: Array(100).fill(0).map((_, index)=> index),
		datasets: [{
			axis: 'x',
			label: 'Data',
			data: data,
			fill: false,
			backgroundColor: "rgba(75, 192, 192,0.4)",
			borderColor: "rgba(75, 192, 192, 1)"
		}]
	},
	options: {}
});
document.getElementById('containerNewPatient').style.display="none";
document.getElementById("checkPatient").addEventListener("click", 
function(event) {
	let email =  document.getElementById("patientEmail").value;
	changeBiometrics(getAccountName(email));
});
document.getElementById("patientTab").addEventListener("click",
function(event) {
	document.getElementById("containerPatient").style.display="block";
	document.getElementById("containerNewPatient").style.display="none";
});
document.getElementById("newPatient").addEventListener("click",
function(event) {
	document.getElementById("containerPatient").style.display="none";
	document.getElementById("containerNewPatient").style.display="block";
});
document.getElementById("createPatient").addEventListener("click",
function(event) {
	let email = document.getElementById("newPatientEmail").value;
	if (email.includes("@doc")) {
		document.getElementById("error").textContent = "Can't make a doctor's account as a doctor";
		return;
	}
	let pass = document.getElementById("newPatientPassword").value;
	let passConfirm = document.getElementById("newPatientPasswordConfirm").value;
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
		localStorage.setItem("auth", 0);
		window.location.href = "login.html";
	}).catch((error)=>{}) // do nothing on fail i guess
});