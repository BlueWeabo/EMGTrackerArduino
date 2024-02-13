"use client"
import LogoutButton from "../components/logoutButton";
import NavigationBar from "../components/navigation";
import DoctorForm from "../components/doctorForm";
import DoctorSearch from "../components/doctorSearch";

let searchOrNew = false;
export default async function Doctor() {
    function onClick() {
        searchOrNew = !searchOrNew;
    }

    return (
        <>
            <NavigationBar>
                <button className="tab" onClick={onClick}>{!searchOrNew ? "Create New Patient" : "Search Patient Information"}</button>
                <LogoutButton />
            </NavigationBar>
            <DoctorSearch searchOrNew={searchOrNew} />
            <DoctorForm searchOrNew={searchOrNew} />
        </>
    )
}
