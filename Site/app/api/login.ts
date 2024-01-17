'use server'

import { User, signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { authPromise } from "./firebase";
import { setUser } from "./auth";
let user: User | null = null;
let messageText: string = '';
let redirectURL:string | null = null;
export async function loginUser(prevState:any, formData:FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
        return {
            message: "failed-email-password"
        }
    }
    const auth = await authPromise;
    await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
        user = userCred.user;
        if (user) {
            messageText = 'Success';
            const authL = defineAuthority(user.email);
            switch (authL) {
                case 0: {
                    redirectURL = "/patient";
                    break;
                }
                case 1: {
                    redirectURL = "/doctor";
                    break;
                }
                case 2: {
                    redirectURL = "/admin";
                    break;
                }
                default: {
                    messageText = "wrong-auth";
                }
            }
        }
    }).catch((reason) => {
      const message: string = reason.message;
      if (message.includes("invalid-email")) {
        messageText = "invalid-email";
      }
        messageText = reason.message;
    });
    await setUser(user);
    if (redirectURL !== null) {
        redirect(redirectURL);
    }
    return {
        message: messageText
    }    
}

function defineAuthority(email:string|null):number {
	let auth = 0;
  if (email == null) return auth;
	if (email.includes("@doc")) {
		auth = 1;
	} else if (email.includes("@admin")) {
		auth = 2;
	}
	return auth;
}