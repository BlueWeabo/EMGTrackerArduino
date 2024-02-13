'use server'
import NavigationBar from "../components/navigation";
import BiometricChart from "../components/biometricChart";
import LogoutButton from "../components/logoutButton";
import { checkAuth } from "../api/auth";
import { redirect } from "next/navigation";
import { unsub } from "../api/chartDataGeneration";

export default async function Patient() {
    if (!checkAuth()) {
        redirect("/");
    }
    return (
        <div>
            <NavigationBar>
                <LogoutButton/>
            </NavigationBar>
            <div className="genericContainer">
                <div className="centerDiv">
                    <a className="centerElement" href="https://static.framar.bg/filestore/emg_nc.png" target="_blank">Примерни стойности за здрав и болен пациент</a>
                </div>
                <BiometricChart />
            </div>
        </div>
    )
};
