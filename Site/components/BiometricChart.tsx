import { Database } from "firebase/database";
import { Dispatch, useState } from "react";
import { Line } from "react-chartjs-2";

const labels = Array.prototype.fill(0,0,1000).map((val,i,arr)=>(i+1).toString);
const data = Array.prototype.fill(0,0,1000); 
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
    return (
        <>
            <LineChart chartData={data}></LineChart>
        </>
    )
}