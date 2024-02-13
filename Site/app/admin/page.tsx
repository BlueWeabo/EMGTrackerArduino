"use server"

import NavigationBar from "../components/navigation";
import LogoutButton from "../components/logoutButton";
import AdminForm from "../components/adminForm";

const initialState = { message: "" };
export default async function Admin() {
    return (
        <>
            <NavigationBar>
                <LogoutButton />
            </NavigationBar>
            <AdminForm />
        </>
    )
}
