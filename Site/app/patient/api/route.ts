import { checkAuth } from "@/app/api/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
    return await checkAuth().then((success) => {
        if (!success) {
            return new Response("Not logged in!", {
                status: 403
            })
        } else {
            return new Response("Logged in", {
                status: 200
            })
        }
    })
}

export async function POST(request: Request) {
}