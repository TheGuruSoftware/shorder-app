import { useState } from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
export default function Orders({ iniOrders }) {
    const [orders, setOrders] = useState(iniOrders)

    return (
        <main>
            {orders ?
                orders.map(order => (
                    <div key={order.id}>
                        {order.username}
                    </div>
                ))
                :
                <div>Loading...</div>
            }
            <button onClick={async (data, e) => {
                try {
                    await saveUser(data)
                    setOrders([...orders], data)
                    e.target.reset();

                } catch (err) {
                    console.error(err)
                }
            }}>Save</button>
        </main >
    )
}
