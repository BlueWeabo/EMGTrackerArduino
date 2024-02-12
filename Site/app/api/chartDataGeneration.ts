'use server'

import { databasePromise } from "./firebase";
import { redirect } from "next/navigation";
import { get, onValue, ref } from "firebase/database";
import { getAccountName } from "./emailConversion";
import { cookies } from "next/headers";


const data = new Array<number>(1000);
let unsub : Function = ()=>{};

async function changeBiometrics(email:string) {
    const database = await databasePromise();
	if (typeof unsub !== 'undefined' && unsub !== null) {
		unsub();
	}
    if (!email) {
        redirect("/");
    }
	unsub = onValue(ref(database, `Muscle Biometrics/${ await getAccountName(email)}/Current`), (snapshot) => {
		let dat = snapshot.val();
		setData(dat);
	});
};

async function setData(_data:number) {
    data.shift();
    data[999] = _data;
    console.log(data);
}

async function getData() {
    const database = await databasePromise();
    const email = cookies().get("user")?.value;
    if (!email) {
        redirect("/");
    }
    const data = await get(ref(database, `Muscle Biometrics/${await getAccountName(email)}/Current`)).then((snapshot) => {
        if (snapshot.exists()) {
            const arr  = snapshot.val();
            return arr;
        } else {
            return new Array(100);
        }
    }).catch((error) => {
        return new Array(100);
    });
    return data;
}

async function getDataDoc(patient:string) {
    const database = await databasePromise();
    const data = await get(ref(database, `Muscle Biometrics/${await getAccountName(patient)}/Current`)).then((snapshot) => {
        if (snapshot.exists()) {
            const arr  = snapshot.val();
            return arr;
        } else {
            return new Array(100);
        }
    }).catch((error) => {
        return new Array(100);
    });
    return data;
}

export {unsub, changeBiometrics, getData, getDataDoc};
