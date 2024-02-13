"use client"
import { useState } from "react";
import LogoutButton from "../components/logoutButton";
import NavigationBar from "../components/navigation";
import DoctorForm from "../components/doctorForm";
import DoctorSearch from "../components/doctorSearch";

export default function Doctor() {
    const [searchOrNew, setSearchOrNew] = useState(false);
    function onClick() {
        setSearchOrNew(!searchOrNew);
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
