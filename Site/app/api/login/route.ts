import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { authPromise } from "../firebase";

export async function POST(prevState: any, formData:FormData) {
    const username = formData.get("email")
    if (username == null) {
        return {
            message: 'Enter a valid email'
        }
    }
    console.log(username);
    console.log(username.toString());
    const password = formData.get("password")
    if (password == null) {
        return {
            message: 'Enter a valid password'
        }
    }
    //const auth = await authPromise;
    const obj = { message: ''};
    return obj;
    //signInWithEmailAndPassword(auth, username.toString(), password.toString()).then((userCred)=>validateCredentials(userCred, password.toString(), obj), (reason) => catchFailure(reason, obj)).catch((reason) => catchFailure(reason, obj));
    //return obj;
}
  
function validateCredentials(credentials : UserCredential, password:string, message:any) {
    const user = credentials.user;
    if (user) {
        localStorage.setItem("userEmail", user.email != null && typeof user.email !== 'undefined' ? user.email : "");
        localStorage.setItem("userPassword", password);
        const authLevel = defineAuthority(user.email);
        localStorage.setItem("auth", authLevel.toString());
	    switch (authLevel) {
	    	case 0:
                message.message = "success";
	    		redirect("/patient");
	    	case 1:
                redirect("/doctor");
	    	case 2:
                redirect("/admin");
	    }
    }
}

function catchFailure(error:any, message:any) {
    message.message = error.message;
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
