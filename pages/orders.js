export async function getServerSideProps() {
    return {
        props: {
            orders: [
                {
                    id: "1",
                    name: "John Doe"
                },
                {
                    id: "2",
                    name: "Jan Kowalski"
                },
                {
                    id: "3",
                    name: "Adam Nowak"
                }
            ]
        }
    }
}
export default function Orders({ orders }) {
    return (
        <main>
            {orders.map(order => (
                <div key={order.id}>
                    {order.name}
                </div>
            ))}
        </main>
    )
}
