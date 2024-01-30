import { checkAuth } from "@/app/api/auth";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {

    const logged = await checkAuth()
    if (!logged) {
        return new Response("Not logged in!", {
            status: 403
        })
    }
    return new Response("Logged in", {
        status:200
    })
}