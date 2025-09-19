import { Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";

export default function UserOrders({
    orders = [],
    orderItems = [],
    lifts = []
}: {
    orders: any[],
    orderItems: any[],
    lifts: any[]
}) {
    const { user } = useAuth();

    const userOrders = orders.filter(order => order.userId === user?.id);

    const getOrderItems = (orderId: number) =>
        orderItems.filter(item => item.orderId === orderId);

    const getLiftName = (liftId: number) => {
        const lift = lifts.find(l => l.id === liftId);
        return `${lift?.name} (${lift?.brand})`;
    };
   
    return (
        <Container>
            <h2 className="text-primary mb-4">Ordrar</h2>
            {userOrders.length === 0 ? (
                <p>Du har inga ordrar.</p>
            ) : (
                userOrders.map(order => {
                    const items = getOrderItems(order.id);
                    return (
                        <div key={order.id} className="mb-5 p-3 bg-secondary">
                            <h4 className="text-primary">Order #{order.id}</h4>
                            <p>
                                <strong>Orderdatum:</strong> {order.orderDate} <br />
                                <strong>Returdatum:</strong> {order.returnDate} <br />
                            </p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Produkt</th>
                                        <th>Pris per dag</th>
                                        <th>Startavgift</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length > 0 ? (
                                        items.map(item => {
                                            const lift = lifts.find(l => l.id === item.liftId);
                                            return (
                                                <tr key={item.id}>
                                                    <td>{getLiftName(item.liftId)}</td>
                                                    <td>{lift?.dailyPrice} kr</td>
                                                    <td>{lift?.startFee} kr</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={3}>Inga produkter</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <p>
                                <strong>Totalt pris för order:</strong> {order.totalPrice} kr
                            </p>
                        </div>
                    );
                })
            )}
        </Container>
    );
}
