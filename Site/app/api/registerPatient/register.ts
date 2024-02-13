'use server'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { authPromise, databasePromise } from "../firebase";
import { getAccountName } from "../emailConversion";
import { ref, set } from "firebase/database";


async function register(prevState: any, formData: FormData) {

	const email = formData.get("email")?.toString();
	if (email?.includes("@doc") || email?.includes("@admin") || email === undefined) {
		return {message:"Can't make a doctor/admin account"};
	}
	let pass = formData.get("pass1")?.toString();
	let passConfirm = formData.get("pass2")?.toString();
	if (passConfirm !== pass || pass === undefined || passConfirm == undefined) {
		return {message:"Passwords are different"}
	}
    const database = await databasePromise();
    const auth = await authPromise()
    const accName = await getAccountName(email)
	const mess = await createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
		const user = userCredential.user;
        if (user)
		set(ref(database, 'Muscle Biometrics/' + accName), {
			Current: [1,2,3,4,5,6,7,8,9],
			Monday: {
				Hour2:[1,2,3,4,5,6,7,8,9],
				Hour10:[1,2,3,4,5,6,7,8,9],
				Hour17:[1,2,3,4,5,6,7,8,9]
			},
			Sunday:{
				Hour2:[1,2,3,4,5,6,7,8,9],
				Hour10:[1,2,3,4,5,6,7,8,9],
				Hour17:[1,2,3,4,5,6,7,8,9]
			}
		});
        return {message: "success"};
	}).catch((error) => {
        return {message: error.message};
	});
    return mess;
}

async function registerAdmin(prevState: any, formData: FormData) {

	const email = formData.get("email")?.toString();
	if (email === undefined) {
		return {message:"No Email"};
	}
	let pass = formData.get("pass1")?.toString();
	let passConfirm = formData.get("pass2")?.toString();
	if (passConfirm !== pass || pass === undefined || passConfirm == undefined) {
		return {message:"Passwords are different"}
	}
    const database = await databasePromise();
    const auth = await authPromise()
    const accName = await getAccountName(email)
	const mess = await createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
		const user = userCredential.user;
        if (user) {
            if (email.includes("@health")) {
                set(ref(database, 'Muscle Biometrics/' + accName), {
                    Current: [1,2,3,4,5,6,7,8,9],
                    Monday: {
                        Hour2:[1,2,3,4,5,6,7,8,9],
                        Hour10:[1,2,3,4,5,6,7,8,9],
                        Hour17:[1,2,3,4,5,6,7,8,9]
                    },
                    Sunday:{
                        Hour2:[1,2,3,4,5,6,7,8,9],
                        Hour10:[1,2,3,4,5,6,7,8,9],
                        Hour17:[1,2,3,4,5,6,7,8,9]
                    }
                });
            }
            return {message: "success"};
        }
        return {message:"failure"};
	}).catch((error) => {
        return {message: error.message};
	});
    return mess;
}

export {register, registerAdmin}
