"use client"

import { useState } from "react";
import BiometricChartDoc from "./biometricChartDoc"

export default function DoctorSearch({ searchOrNew }: { searchOrNew: boolean }) {
    const [search, setSearch] = useState("");

    function searchFun() {
        const url: URL = new URL(process.env.NEXT_PUBLIC_URL + "/api/setsearch");
        fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(search),
        });
    }

    return (
        <div className="genericContainer" hidden={searchOrNew}>
            <div className="tabs">
                <input type="email" placeholder="example.example@health.bg" className="tab" onChange={(e) => setSearch(e.currentTarget.value)} onKeyUp={(e) => setSearch(e.currentTarget.value)} />
                <button onClick={searchFun} className="tab" value="Search">Search</button>
            </div>
            <BiometricChartDoc />
        </div>
    )
}
