
import { checkAuth } from "@/app/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {

    const logged = await checkAuth()
    if (!logged) {
        return new Response("Not logged in!", {
            status: 403
        });
    }
    const user = request.headers.get("user");
    if (user) {
        const curr = cookies().get("data")?.value;
        if (curr) {
            const data = JSON.parse(curr);

        }
    } else {
        return new Response("No username", {
            status:400
        });
    }
}