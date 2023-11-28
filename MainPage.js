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
const authLevel = localStorage.getItem("auth");
const data = new Array(100);
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

document.getElementById("logout").addEventListener("click",
function(event) {
	signOut(auth).then(() => {
		localStorage.setItem("userEmail", "");
		localStorage.setItem("userPassword", "");
		localStorage.setItem("auth", -1);
		window.location.href = "login.html";
	}).catch((error)=>{}) // do nothing on fail i guess
});

const email = localStorage.getItem("userEmail");
changeBiometrics(getAccountName(email));