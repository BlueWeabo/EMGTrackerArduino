'use client'
import { useFormState } from "react-dom";
import { loginUser } from "./actions";

const initialState = {
    message: ''
}
export default function App() {
  const [state, formAction] = useFormState(loginUser, initialState);
    return (
    <>
        <form action={formAction}>
            <label>{state?.message}</label>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" >Login</button>
        </form>
    </>
  )
}
