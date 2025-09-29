import { Container, Row, Col, Card } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import svLocale from "@fullcalendar/core/locales/sv";
import type Lift from "../../../interfaces/Lift";
import type User from "../../../interfaces/User";

export default function AdminDashboard() {
    const { lifts, users, orders, orderItems } = useLoaderData() as {
        lifts: Lift[];
        users: User[];
        orders: any[];
        orderItems: any[];
    };

    const [currentOrders, setCurrentOrders] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);

    const getCurrentOrders = () => {
        const today = new Date();
        const activeOrders = orders.filter(
            (order) =>
                new Date(order.orderDate) <= today &&
                new Date(order.returnDate) >= today
        );

        return activeOrders;
    };

    const mapEvents = () => {
        const mapped = orders.map((order) => {
            const items = orderItems.filter((oi) => oi.orderId === order.id);

            const liftNames = items
                .map((oi) => lifts.find((l) => l.id === oi.liftId)?.name)
                .join(", ");

            const endDate = new Date(order.returnDate);
            endDate.setDate(endDate.getDate() + 1);

            return {
                title: `#${order.id} - ${liftNames}`,
                start: order.orderDate,
                end: endDate,
                allDay: true,
            };
        });
        return mapped;
    };

    useEffect(() => {
        const active = getCurrentOrders();
        setCurrentOrders(active);
        const mapped = mapEvents();

        setEvents(mapped);
    }, [orders, orderItems, lifts]);


    return (
        <Container className="my-4">

            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center h-100 bg-secondary">
                        <Card.Body>
                            <h5 className="text-primary">{orders.length}</h5>
                            <p className="mb-0">Totala Beställningar</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100 bg-secondary">
                        <Card.Body>
                            <h5 className="text-success">{currentOrders.length}</h5>
                            <p className="mb-0">Pågående Uthyrningar</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100 bg-secondary">
                        <Card.Body>
                            <h5 className="text-info">{lifts.length}</h5>
                            <p className="mb-0">Totala Liftar</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100 bg-secondary">
                        <Card.Body>
                            <h5 className="text-warning">{users.length}</h5>
                            <p className="mb-0">Användare</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="my-5 p-3 bg-secondary">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale={svLocale}
                    events={events}
                    height="auto"
                    eventClassNames={() => "fc-custom-event"}
                />
            </Card>

        </Container>
    );
}
