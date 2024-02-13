"use client"

import { useFormState } from "react-dom";
import { register } from "../api/registerPatient/register";
import SubmitButton from "./submitButton";
const initialState = {message:""};
export default function DoctorForm({searchOrNew}:{searchOrNew:boolean}) {
    const [state, formAction] = useFormState(register, initialState);
    return (
        <form action={formAction} className="genericContainer" hidden={!searchOrNew}>
            <label htmlFor="newPatientEmail">Patient Email</label>
            <input id="newPatientEmail" type="email" placeholder="patient@health.bg" name="email" />
            <label htmlFor="newPatientPassword">Patient Password</label>
            <input id="newPatientPassword" type="password" name="pass1" />
            <label htmlFor="newPatientPasswordConfirm">Confirm Patient Password</label>
            <input id="newPatientPasswordConfirm" type="password" name="pass2" />
            <SubmitButton constantText="Create" pendingText="Creating" className="loginButton" />
            <label className="error-message">{state.message}</label>
        </form>
    )
}
