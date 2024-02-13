"use client"

import { useFormState } from "react-dom";
import { registerAdmin } from "../api/registerPatient/register";
import SubmitButton from "./submitButton";

const initialState = { message: "" }
export default function AdminForm() {
    'use client'
    const [state, formAction] = useFormState(registerAdmin, initialState);
    return (
        <form action={formAction} className="genericContainer">
            <label htmlFor="newPatientEmail">Email</label>
            <input id="newPatientEmail" type="email" placeholder="patient@health.bg" name="email" />
            <label htmlFor="newPatientPassword">Password</label>
            <input id="newPatientPassword" type="password" name="pass1" />
            <label htmlFor="newPatientPasswordConfirm">Confirm Password</label>
            <input id="newPatientPasswordConfirm" type="password" name="pass2" />
            <SubmitButton constantText="Create" pendingText="Creating" className="loginButton" />
            <label className="error-message">{state.message}</label>
        </form>
    )
}
