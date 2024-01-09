import { Database } from "firebase/database";
import { Dispatch, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData } : {chartData: {labels:string[], datasets:[]}}) {
  return (
  <>
    <Line
      data={chartData}
      options={{}}
    >
    </Line>
  </>
  )
}

function BiometricChart({database}: {database: Database}) {
    const [data, setData]: [number[], Dispatch<number[]>] = useState(Array.prototype.fill(0,0,1000));
    return (
        <>
            <LineChart chartData={
                labels=data.map((val, i, arr)=>i.toString()),

            }></LineChart>
        </>
    )
}