import { User } from "firebase/auth";
import { redirect } from "next/navigation";


let user: User | null = null;

async function isLoggedIn(): Promise<boolean> {
    return user != null;
}

async function setUser(newUser: User | null): Promise<void> {
    user = newUser;
}

async function checkAuth() {
    if (!await isLoggedIn()) {
        redirect("/");
    }
}

export {isLoggedIn, setUser, checkAuth};