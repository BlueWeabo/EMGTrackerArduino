'use client'
import { useState } from "react";
import { Chart, ChartProps } from "react-chartjs-2";

const labels = [1000].map((num, i, arr)=> i.toString());
const label = "Data";
export default function BiometricChart({user} : { user:string }) {

    const [data, setData] = useState<Array<number> | null>(null)
    fetch("http://localhost:3000/api/get_biometric_data", {
        method: "GET",
        headers: {
            user: user
        }
    }).then((res) => {
        if (res.status==200) {
            let dat = "";
            res.text().then((text) => {
                dat = text;
            })
            setData(JSON.parse(dat));
        }
    });
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                borderWidth: 1
            }
        ]
    }
    return (
        <>
            <Chart type="line" data={chartData} height={200} width={300}></Chart>
        </>
    )
}