"use client"
import { useFormState } from "react-dom";
import BiometricChartDoc from "../components/biometricChartDoc";
import LogoutButton from "../components/logoutButton";
import NavigationBar from "../components/navigation";
import { useState } from "react";
import { register } from "../api/registerPatient/register";
import SubmitButton from "../components/submitButton";
const initialState = {
    message: "",
}
export default function Patient() {
    const [searchOrNew, setSearchOrNew] = useState(false);
    const [search, setSearch] = useState("");
    const [state, formAction] = useFormState(register, initialState);


    function onClick() {
        setSearchOrNew(!searchOrNew);
    }

    function searchFun() {
        const url: URL = new URL(process.env.NEXT_PUBLIC_URL + "/api/setsearch");
        fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(search),
        });
    }
    return (
        <>
            <NavigationBar>
                <LogoutButton />
                <button className="tab" onClick={onClick}>{!searchOrNew ? "Create New Patient" : "Search Patient Information"}</button>
            </NavigationBar>
            <div className="genericContainer" hidden={searchOrNew}>
                <div className="tabs">
                    <input type="text" className="tab" onChange={(e) => setSearch(e.currentTarget.value)} onKeyUp={(e) => setSearch(e.currentTarget.value)} />
                    <button onClick={searchFun} className="tab" value="Search">Search</button>
                </div>
                <BiometricChartDoc />
            </div>
            <form action={formAction} className="genericContainer" hidden={!searchOrNew}>
                <label htmlFor="newPatientEmail">Patient Email</label>
                <input id="newPatientEmail" type="email" placeholder="patient@health.bg" name="email"/>
                <label htmlFor="newPatientPassword">Patient Password</label>
                <input id="newPatientPassword" type="password" name="pass1"/>
                <label htmlFor="newPatientPasswordConfirm">Confirm Patient Password</label>
                <input id="newPatientPasswordConfirm" type="password" name="pass2"/>
                <SubmitButton constantText="Create" pendingText="Creating" className="loginButton" />
                <label className="error-message">{state.message}</label>
            </form>
        </>
    )
}
