"use server"

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const search = await request.json();
    cookies().set("docSearch", search, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        maxAge: 60 * 60 * 7 * 24,
        path: '/',
        sameSite: "strict"
    });
    return new NextResponse();
}
