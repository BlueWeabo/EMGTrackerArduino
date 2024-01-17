import { User } from "firebase/auth";


let user: User | null = null;

async function isLoggedIn(): Promise<boolean> {
    return user != null;
}

async function setUser(newUser: User | null): Promise<void> {
    user = newUser;
}


export {isLoggedIn, setUser};