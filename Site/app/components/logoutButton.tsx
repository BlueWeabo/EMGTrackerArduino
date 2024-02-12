'use client'
import { useFormState } from "react-dom";
import SubmitButton from "./submitButton";
import { logoutUser } from "../api/logout";


export default function LogoutButton() {
    const [state, formAction] = useFormState(logoutUser, {message: ""});
    return (
        <>
            <form action={formAction} className="tab">
                <SubmitButton className="logoutButton" constantText="Log out" pendingText="Logging out"/>
            </form>
        </>
    )
}
