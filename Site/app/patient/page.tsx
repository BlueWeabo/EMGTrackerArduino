'use client'
import { useFormState } from "react-dom";
import { logoutUser } from "../api/logout";
import NavigationBar from "../components/navigation";
import SubmitButton from "../components/submitButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chart } from "react-chartjs-2";
import BiometricChart from "../components/biometricChart";

const initialState = {
    message: ''
}

export default function Patient() {
    const [state, formAction] = useFormState(logoutUser, initialState)
    const [loggedIn, setState] = useState(false);
    const router = useRouter();
    {
        if (!loggedIn)
            fetch(new Request("http://localhost:3000/patient/api", {
                method: "GET"
            })).then((response) => {
                if (response.status===200) {
                    setState(true);
                } else {
                    router.push("/")
                }
            }).catch((reason)=>{
                // F you
            })
    }
    const [user, setUser] = useState<string|null>(null);
    if (!user) {
        fetch("http://localhost:3000/api/user", {
            method: "GET"
        }).then((res) => {
            if (res.status === 200) {
                setUser(res.headers.get("user"));
            }
        })
    }

    return (
        <div className="container">
            <NavigationBar>
                <form action={formAction}>
                    <SubmitButton className="logout" constantText="Log out" pendingText="Logging out"/>
                </form>
            </NavigationBar>
            <BiometricChart user={user ? user : ""}></BiometricChart>
        </div>
    )
}