import { useState } from 'react'
import { prisma } from '../prismaC'

export async function getServerSideProps() {
    const orders = await prisma.user.findMany()
    return {
        props: {
            iniOrders: orders
        }
    }
}

async function saveUser(user) {
    const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}
export default function Add({ iniOrders }) {
    const [orders, setOrders] = useState(iniOrders)
    /*
        npm i -D prisma
        npm i @prisma/client
        npx prisma init

        npx prisma migrate dev
        npx prisma studio

    */
    return (
        <main>

        </main >
    )
}
