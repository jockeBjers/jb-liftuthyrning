import { Table, Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import FilterButtons from "../../../components/FilterButtons";
import OrderPagination from "../../../components/TablePagination";
import type User from "../../../interfaces/User";
import { useLoaderData } from "react-router-dom";

export default function OrderTab() {
    const { lifts, users, orders, orderItems } = useLoaderData() as {
        lifts: any[];
        users: User[];
        orders: any[],
        orderItems: any[]
    };
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;


    const [view, setView] = useState<"all" | "current" | "coming" | "closed">("all");
    const userOrdersFiltered = orders.filter(order => order.userId !== null);

    function matchesView(order: any, view: string) {
        const today = new Date();
        const orderDate = new Date(order.orderDate);
        const returnDate = new Date(order.returnDate);
        switch (view) {
            case "current":
                return orderDate <= today && returnDate >= today;
            case "coming":
                return orderDate > today;
            case "closed":
                return returnDate < today;
            default:
                return true;
        }
    }

    const ordersToDisplay = userOrdersFiltered.filter(order => matchesView(order, view));


    useEffect(() => {
        setCurrentPage(1);
    }, [view]);

    const totalPages = Math.ceil(ordersToDisplay.length / pageSize);

    const getUserById = (id: number) =>
        users.find(u => u.id === id);


    return (
        <>
            <Container fluid className=" my-5">
                <Row className="align-items-center g-0">
                    <Col xs="12" md="8">
                        <Row className="align-items-center g-2">
                            <Col xs="auto">
                                <FilterButtons
                                    options={[
                                        { label: "Alla", value: "all", variant: "primary", textColor: "text-white" },
                                        { label: "Pågående", value: "current", variant: "success", textColor: "text-white" },
                                        { label: "Kommande", value: "coming", variant: "warning", textColor: "text-black" },
                                        { label: "Avslutade", value: "closed", variant: "danger", textColor: "text-white" },
                                    ]}
                                    selected={view}
                                    setSelected={setView}
                                />
                            </Col>
                            <Col xs="12" md="4">
                                <input
                                    type="text"
                                    className="modern-input form-control p-2"
                                    placeholder="Sök bland ordrar..."
                                    value={''}
                                    onChange={() => { }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md="4" className="d-flex justify-content-md-end">
                        <Button
                            onClick={() => { }}
                            size="lg"
                        >
                            Lägg till ny order
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kund</th>
                        <th>E-post</th>
                        <th>Telefon</th>
                        <th>Orderdatum</th>
                        <th>Returdatum</th>
                        <th>Totalt pris</th>
                        <th>Hantera</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersToDisplay
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .map(order => {
                            const user = getUserById(order.userId);
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{user ? `${user.firstName} ${user.lastName}` : "Okänd"}</td>
                                    <td>{user?.email || "-"}</td>
                                    <td>{user?.phone || "-"}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.returnDate}</td>
                                    <td>{order.totalPrice} kr</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-secondary bg-transparent w-100 fw-bold"
                                            onClick={() => { }}
                                        >
                                            Visa detaljer
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <OrderPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            )}
          
        </>
    );
}
