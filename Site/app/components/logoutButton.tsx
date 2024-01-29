'use client'
import { useFormState } from "react-dom";
import SubmitButton from "./submitButton";
import { logoutUser } from "../api/logout";


export default function LogoutButton() {
    const [state, formAction] = useFormState(logoutUser, {message: ""});
    return (
        <>
            <form action={formAction}>
                <SubmitButton className="logout" constantText="Log out" pendingText="Logging out"/>
            </form>
        </>
    )
}