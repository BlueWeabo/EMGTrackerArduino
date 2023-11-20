auth = path("./Firebase");

if (window.location.href == "Index.html") {
    if (!tryToLoginStorage()) {
        window.location.href = "Login.html";
    } else {
        window.location.href = "MainPage.html";
    }
}
let button = document.getElementById("loginButton")
let password = "";
let user;
button?.onclick?.bind(tryToLogin)
function tryToLogin() {
    let email = document.getElementById("email")?.nodeValue;
    if (email == undefined || email == null) return;
    let pass = document.getElementById("password")?.nodeValue;
    if (pass == undefined || pass == null) return;
    password = pass;
    auth.signInWithEmailAndPassword(auth, email, password).then(validateCredentials).catch(catchFailure);
}

function tryToLoginStorage() {
    let email = localStorage.getItem("userEmail");
    if (email == undefined || email == null) return false;
    let pass = localStorage.getItem("userPassword");
    if (pass == undefined || pass == null) return false;
    auth.signInWithEmailAndPassword(auth, email, pass).then(validateCredentials).catch(catchFailure);
    if (user) {
        return true;
    }
    return false;
}

function validateCredentials(credentials) {
    user = credentials.user;
    if (user) {
        window.location.href="MainPage.html";
        localStorage.setItem("userEmail", user.email != null ? user.email : "");
        localStorage.setItem("userPassword", password);
    }
}

function catchFailure(error) {
    const erC = error.code;
    const erM = error.message;
    let errorArea = document.getElementById("error");
    if (errorArea == null) return;
    errorArea.textContent = erM;
}

export let finalUser = user;