'use client'
import "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

const labels = new Array(300).fill(1).map((_, i, __) => { return i.toString() });
export default function BiometricChart() {
    const [data, setData] = useState<number[]>();
    let normal = 0;
    let necro = 0;
    let mito = 0;
    useEffect(() => {
        const url = new URL(process.env.NEXT_PUBLIC_URL+"/api/chartdata");
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
    });
    function getColor(value: number) {
        if (value < 100) {
            necro++;
            return "rgba(255, 75, 75, 1)";
        } else if (value < 500) {
            normal++;
            return "rgba(75, 192, 192, 1)";
        } else {
            mito++;
            return "rgb(255, 255, 75, 1)";
        }
    }
    function getText() {
        if (normal > necro + mito) {
            return "No illness could be determined. Ask a doctor to confirm";
        }
        if (necro > normal+mito) {
            return "There is a possibility of necro. Ask a doctor to confirm.";
        }
        if (mito > normal+necro) {
            return "There is a possibility of mito. Ask a doctor to confirm.";
        }
        if (mito + necro > normal) {
            return "There is a possibility of necro or mito. Ask a doctor to confirm.";
        }
        return "No illness could be determined. Ask a doctor to confirm";
    }
    return (
        <>
            <Chart type="line" data={{
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: "rgba(75, 192, 192,0.4)",
                        borderColor: data ? data.map(getColor) : "rgba(75, 192, 192, 1)"
                    }
                ]
            }} height={100} width={300} options={{
                responsive: true,
            }}></Chart>
            <div>{getText()}</div>
        </>
    )
}
