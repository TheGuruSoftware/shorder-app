import { useState } from 'react'
import { prisma } from '../prismaC'

export async function getServerSideProps() {
    /*
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})
    */
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
    /*
        npm i -D prisma
        npm i @prisma/client
        npx prisma init

        npx prisma migrate dev
        npx prisma studio

    */
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
            <button onClick={async (e) => {
                const data = {
                    username: 'test',
                    password: 'test2'
                }
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
