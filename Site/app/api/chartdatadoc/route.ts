import { NextRequest, NextResponse } from "next/server";
import { getData, getDataDoc } from "../chartDataGeneration";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {
    const cookie = cookies().get("docSearch")?.value;
    if (!cookie) {
        return NextResponse.json({
            body: JSON.stringify(new Array<number>(100)),
        })
    }
    const data = await getDataDoc(cookie);
    return NextResponse.json({
        data: data,
    })
}
