'use client'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
const labels = [1000].map((num, i, arr)=> i.toString());
const label = "Data";
export default function BiometricChart({chartData} : { chartData:any }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: chartData,
                backgroundColor: 'rgba(122, 122, 255, 0.8)',
                borderColor: 'rgba(122,122,255,0.4',
                borderWidth: 1,
            }
        ]
    };
    return (
        <>
            <Line data={data} height={200} width={300}></Line>
        </>
    )
}