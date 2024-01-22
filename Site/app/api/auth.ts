import { User } from "firebase/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function checkAuth() {
    const cookie = cookies().get('session')?.value;
    return cookie !== undefined && cookie !== null && cookie !== "null";
}

export {checkAuth};