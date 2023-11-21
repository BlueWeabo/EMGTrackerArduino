import { Chart } from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
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
const myChart = new Chart(document.getElementById('myChart'), {
    type: "line",
    data: {
		labels: data.map(x=>x.count),
		datasets: [{
			axis: 'x',
			label: '',
			data: [12,121,12,121,542,45,435,453],
			fill: false
		}]
	},
    options: {}
});
const data = new Array(1000);
let read = 0;
let lenght = 1000;
function addData(chart, newData) {
    chart.data.datasets.forEach((dataset) => {
		dataset.data = newData;
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
let currRef;
function changeBiometrics(field) {
	if (!currRef) {
		currRef.off("value");
	}
	currRef = ref('Muscle Biometrics/'+field);
	currRef.on("value", (snapshot) => {
		let dat = snapshot.val();
		data.shift();
		data[999] = dat;
		addData(myChart, data);
	});
}

function getAccountName(email) {
	const usr = email.split('@')[0];
	const user = usr.split('.').toString();
	return user;
}

function defineAuthority(email) {
	const correctedEmail = email.replace(/./g, ' ');
	const dbRef = ref(database);
	let auth = 0;
	get(child(dbRef, `InternalAuthentication/`+correctedEmail)).then((snapshot) => {
		if (snapshot.exists()) {
			console.log(snapshot.val());
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
const authLevel = 0;
const email = localStorage.getItem("userEmail");
authLevel = defineAuthority(email);
switch (authLevel) {
	case 0:
		document.location.href="Login.html";
		break;
	case 1:
		let name = getAccountName(email);
		changeBiometrics(name);
		break;
	case 2:
		break;
	case 3:
		break;
}