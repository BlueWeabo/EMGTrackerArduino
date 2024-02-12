'use client'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";
import { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
const labels = new Array(100).fill(1).map((num, i, arr) => { return i.toString() });
const label = "Data";
export default function BiometricChartDoc() {
    const [data, setData] = useState<number[]>();
    useEffect(() => {
        const url = new URL(process.env.NEXT_PUBLIC_URL+"/api/chartdatadoc");
        fetch(url.toString())
            .then((response) => {
                if (response.ok) {
                    const json = response.json();
                    return json;
                }
            })
            .then((_data) => {
                setData(_data.data);
            })
    })
    return (
        <>
            <Chart type="line" data={{
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: "rgba(75, 192, 192,0.4)",
                        borderColor: "rgba(75, 192, 192, 1)"
                    }
                ]
            }} height={100} width={300} options={{
                responsive: true,
            }}></Chart>
        </>
    )
}
