'use server'
import NavigationBar from "../components/navigation";
import BiometricChart from "../components/biometricChart";
import LogoutButton from "../components/logoutButton";
import { checkAuth } from "../api/auth";
import { redirect } from "next/navigation";
import { onValue, ref } from "firebase/database";
import { cookies } from "next/headers";
import { databasePromise } from "../api/firebase";
import { getAccountName } from "../api/emailConversion";

const data = new Array(100);
let unsub : Function = ()=>{};

async function changeBiometrics() {
    const database = await databasePromise();
	if (typeof unsub !== 'undefined' && unsub !== null) {
		unsub();
	}
    const email = cookies().get("user")?.value;
    if (!email) {
        redirect("/");
    }
	unsub = onValue(ref(database, `Muscle Biometrics/${ await getAccountName(email)}/Current`), (snapshot) => {
		let dat = snapshot.val();
		data.shift();
		data[99] = dat;
        console.log(data);
	});
};

export {unsub};

changeBiometrics();

export default async function Patient() {
    if (!checkAuth()) {
        if (unsub !== null) unsub();
        redirect("/");
    }
    return (
        <div className="container">
            <NavigationBar>
                <LogoutButton/>
            </NavigationBar>
            <BiometricChart chartData={data}/>
        </div>
    )
};