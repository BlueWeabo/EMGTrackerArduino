import { authPromise } from "./firebase";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req:any, res:any) {
  if (req.method == "POST"){
    const username = req.body['username']
    const guess = req.body['password']
    const auth = authPromise;
    signInWithEmailAndPassword(auth, username, guess).then((userCred)=>validateCredentials(userCred, res, guess)).catch((reason) => catchFailure(reason, res));
  } else {
    res.redirect("/")
  }
}
  
function validateCredentials(credentials : UserCredential, res:any, password:string) {
    const user = credentials.user;
    if (user) {
        localStorage.setItem("userEmail", user.email != null && typeof user.email !== 'undefined' ? user.email : "");
        localStorage.setItem("userPassword", password);
        const authLevel = defineAuthority(user.email);
        localStorage.setItem("auth", authLevel.toString());
	    switch (authLevel) {
	    	case 0:
	    		res.redirect("/Patient");
                break;
	    	case 1:
                res.redirect("/Doctor");
	    		break;
	    	case 2:
                res.redirect("/Admin");
	    		break;
	    }
    }
}

function catchFailure(error:any, res:any) {
    error.message;
}
function defineAuthority(email:string|null):number {
	let auth = 0;
    if (email == null) return auth;
	if (email.includes("@doc")) {
		auth = 1;
	} else if (email.includes("@admin")) {
		auth = 2;
	}
	console.log(auth + "auth");
	return auth;
}
