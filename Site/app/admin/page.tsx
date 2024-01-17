'use client'

import { checkAuth } from "../api/auth"

export default function Patient() {
    return (
        <>
            <div onLoad={checkAuth}>You made it</div>
        </>
    )
}