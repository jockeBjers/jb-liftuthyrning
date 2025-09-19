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

    const userOrders = orders.filter(order => order.user_id === user?.id);

    const getOrderItems = (orderId: number) =>
        orderItems.filter(item => item.order_id === orderId);

    const getLiftName = (liftId: number) => {
        const lift = lifts.find(l => l.id === liftId);
        return `${lift?.name} (${lift?.brand})`;
    };

    const calculateOrderTotal = (order: any) => {
        let total = 0;
        const items = getOrderItems(order.id);
        const days = Math.ceil(
            (new Date(order.return_date).getTime() - new Date(order.order_date).getTime()) /
            (1000 * 3600 * 24)
        );

        for (const item of items) {
            const lift = lifts.find(l => l.id === item.lift_id);
            if (!lift) continue; 

            const itemTotal = (lift.daily_price * days) + lift.start_fee;
            total += itemTotal;
        }
        return total;
    };

    return (
        <Container>
            <h2 className="text-primary mb-4">Ordrar</h2>
            {userOrders.length === 0 ? (
                <p>Du har inga ordrar.</p>
            ) : (
                userOrders.map(order => {
                    const items = getOrderItems(order.id);
                    const orderTotal = calculateOrderTotal(order);
                    return (
                        <div key={order.id} className="mb-5 p-3 bg-secondary">
                            <h4 className="text-primary">Order #{order.id}</h4>
                            <p>
                                <strong>Orderdatum:</strong> {order.order_date} <br />
                                <strong>Returdatum:</strong> {order.return_date || '-'} <br />
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
                                            const lift = lifts.find(l => l.id === item.lift_id);
                                            return (
                                                <tr key={item.id}>
                                                    <td>{getLiftName(item.lift_id)}</td>
                                                    <td>{lift?.daily_price} kr</td>
                                                    <td>{lift?.start_fee} kr</td>
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
                                <strong>Totalt pris för order:</strong> {orderTotal} kr
                            </p>
                        </div>
                    );
                })
            )}
        </Container>
    );
}
