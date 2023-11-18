import { auth } from "./Firebase"
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";

let button = document.getElementById("loginButton")
button?.onclick?.bind(tryToLogin)
function tryToLogin() {
    let email = document.getElementById("email")?.nodeValue;
    if (email == undefined || email == null) return;
    let password = document.getElementById("password")?.nodeValue;
    if (password == undefined || password == null) return;
    signInWithEmailAndPassword(auth, email, password).then(validateCredentials).catch(catchFailure);
}

function validateCredentials(credentials : UserCredential) {
    const user = credentials.user;
    if (user) {
        // Change to main page, ect.
    } else {
        // throw an error of sorts
    }
}

function catchFailure(error : any) {
    const erC = error.code;
    const erM = error.message;
}