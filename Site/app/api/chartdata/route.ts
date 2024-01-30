import { NextRequest, NextResponse } from "next/server";
import { getData } from "../chartDataGeneration";


export async function GET(request: NextRequest) {
    const data = await getData();
    return NextResponse.json({
        data: data
    })
}