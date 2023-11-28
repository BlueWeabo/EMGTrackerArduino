import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
import { getDatabase, ref, set, child, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
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
const authLevel = localStorage.getItem("auth");
const auth = getAuth(app);
let user = null;
const data = new Array(100);
let read = 0;
let lenght = 1000;
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
	let pass = document.getElementById("newPatientPassword").value;
	let passConfirm = document.getElementById("newPatientPasswordConfirm").value;
	if (passConfirm !== pass) {
		document.getElementById("error").value = "Not the same password. Try again";
		return;
	}
	let obj = {};
	obj['Muscle Biometrics.'+getAccountName(email)] = {
		Current:0,
		Monday:{
			Hour2:[1,2,3,4,5,6,7,8,9],
			Hour10:[1,2,3,4,5,6,7,8,9],
			Hour17:[1,2,3,4,5,6,7,8,9]
		},
		Sunday:{
			Hour2:[1,2,3,4,5,6,7,8,9],
			Hour10:[1,2,3,4,5,6,7,8,9],
			Hour17:[1,2,3,4,5,6,7,8,9]
		}
	};
	console.log(obj);
	console.log(JSON.stringify(obj));
	console.log(JSON.parse(JSON.stringify(obj)));	
	set(ref(database, '/', obj))
	document.getElementById("error").value = "Success";
})