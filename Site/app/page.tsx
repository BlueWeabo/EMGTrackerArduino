'use client'
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "./components/submit-button";
import { loginUser } from "./api/login";

const initialState = {
    message: ''
}

export default function App() {
  const [state, formAction] = useFormState(loginUser, initialState);
    return (
    <>
        <form action={formAction}>
            <label className={state.message}>{state?.message}</label>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <SubmitButton constantText="Login" pendingText="Logging in..." className="loginButton" />
        </form>
    </>
  )
}
