import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
import { getDatabase, ref, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
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

const auth = getAuth(app);
const user = null;
const data = new Array(100);
let read = 0;
let lenght = 1000;
function addData(chart, newData) {
    chart.data.datasets.forEach((dataset) => {
		dataset.data.push(newData);
	});
	chart.update();
}

function removeData(chart) {
	chart.data.labels.pop();
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop();
	});
	chart.update();
}
let unsub;
function changeBiometrics(field) {
	if (typeof unsub !== 'undefined') {
		unsub();
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
	return `${capitalizeFirstLetter(user[0])} ${capitalizeFirstLetter(user[1])}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function defineAuthority(email) {
	const correctedEmail = email.replace(/\./g, ' ');
	const dbRef = ref(database);
	let auth = 0;
	//console.log(correctedEmail);
	get(child(dbRef, `InternalAuthentication/${correctedEmail}`)).then((snapshot) => {
		if (snapshot.exists()) {
			//console.log(snapshot.val());
			auth = snapshot.val();
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
	console.log(auth + "auth");
	return auth;
}
const email = localStorage.getItem("userEmail");
const authLevel = defineAuthority(email);
switch (authLevel) {
	case 0:
	case 1:
		const name = getAccountName(email);
		changeBiometrics(name);
		break;
	case 2:
		break;
	case 3:
		break;
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
/*
function tryToLoginStorage() {
    let email = localStorage.getItem("userEmail");
	console.log(email);
    if (email == undefined || email == null) return false;
    let pass = localStorage.getItem("userPassword");
	console.log(pass);
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

if (!tryToLoginStorage()) {
    window.location.href="Login.html";
}*/