import { auth } from "./Firebase"
import { User, UserCredential, signInWithEmailAndPassword } from "firebase/auth";

if (window.location.href == "Index.html") {
    if (!tryToLoginStorage()) {
        window.location.href = "Login.html";
    } else {
        window.location.href = "MainPage.html";
    }
}
let button = document.getElementById("loginButton")
let password = "";
let user: User | undefined | null;
button?.onclick?.bind(tryToLogin)
function tryToLogin() {
    let email = document.getElementById("email")?.nodeValue;
    if (email == undefined || email == null) return;
    let pass = document.getElementById("password")?.nodeValue;
    if (pass == undefined || pass == null) return;
    password = pass;
    signInWithEmailAndPassword(auth, email, password).then(validateCredentials).catch(catchFailure);
}

function tryToLoginStorage() : boolean {
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

function validateCredentials(credentials : UserCredential) {
    user = credentials.user;
    if (user) {
        window.location.href="MainPage.html";
        localStorage.setItem("userEmail", user.email != null ? user.email : "");
        localStorage.setItem("userPassword", password);
    }
}

function catchFailure(error : any) {
    const erC: any = error.code;
    const erM: string = error.message;
    let errorArea = document.getElementById("error");
    if (errorArea == null) return;
    errorArea.textContent = erM;
}

export let finalUser: User | undefined | null = user;