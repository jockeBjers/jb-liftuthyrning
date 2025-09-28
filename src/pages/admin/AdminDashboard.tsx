
import { Container, Row, Col, Card } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import type Lift from "../../interfaces/Lift";
import type User from "../../interfaces/User";

export default function AdminDashboard() {
    const { lifts, users, orders } = useLoaderData() as {
        lifts: Lift[];
        users: User[];
        orders: any[];
    };

    const [currentOrders, setCurrentOrders] = useState<any[]>([]);

    function getCurrentOrders(orders: any[]): any[] {
        const today = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const returnDate = new Date(order.returnDate);
            return orderDate <= today && returnDate >= today;
        });
    }
    
    useEffect(() => {
        setCurrentOrders(getCurrentOrders(orders));
    }, [orders]);

    return (
        <Container className="my-4">
            <h1 className="text-primary mb-4">Översikt</h1>
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
                    <Card className="text-center h- bg-secondary h-100">
                        <Card.Body>
                            <h5 className="text-success">{currentOrders.length}</h5>
                            <p className="mb-0">Pågående Uthyrningar</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h- bg-secondary h-100">
                        <Card.Body>
                            <h5 className="text-info">{lifts.length}</h5>
                            <p className="mb-0">Totala Liftar</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h- bg-secondary h-100">
                        <Card.Body>
                            <h5 className="text-warning">{users.length}</h5>
                            <p className="mb-0">Användare</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}