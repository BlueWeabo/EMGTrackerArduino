
import { checkAuth } from "@/app/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {

    const logged = await checkAuth()
    if (!logged) {
        return new Response("Not logged in!", {
            status: 403
        })
    }
    const user = cookies().get("user")?.value;
    return new Response("Logged in", {
        status:200,
        headers: {
            user: user ? user : ""
        }
    })
}