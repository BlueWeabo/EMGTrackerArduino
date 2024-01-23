'use client'

import { useFormStatus } from "react-dom"

export default async function SubmitButton({pendingText, constantText, className} : {pendingText: string, constantText: string, className:string}) {
    const {pending} = useFormStatus()
    return(
        <>
            <button className={className} disabled={pending} type="submit">{pending ? pendingText : constantText}</button>
        </>
    )
}