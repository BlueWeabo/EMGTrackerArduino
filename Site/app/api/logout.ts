'use server'
import { signOut } from "firebase/auth";
import { authPromise } from "./firebase";
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";


export async function logoutUser(prevState:any, formData: FormData) {
    const auth = await authPromise();
    await signOut(auth);
    cookies().set('session', "null");
    // Needed to make patient page work.
    if (false) {
        return {
            message: 'fail'
        }
    }
    permanentRedirect('/')
}