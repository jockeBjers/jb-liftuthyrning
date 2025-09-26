import { Table, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import FilterDropdown from "../../../components/FilterDropdown";
import SearchInput from "../../../components/SearchInput";
import OrderPagination from "../../../components/TablePagination";
import type User from "../../../interfaces/User";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { calculateRentalCost } from "../../../utils/calculateRentalCost";
import OrderInfoModal from "./OrderInfoModal";

export default function OrderTab() {
    const { lifts, users, orders, orderItems } = useLoaderData() as {
        lifts: any[];
        users: User[];
        orders: any[],
        orderItems: any[]
    };
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [filter, setFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<any | null>(null);
    const [orderItemToDelete, setOrderItemToDelete] = useState<any | null>(null);
    const [showDeleteOrderItemModal, setShowDeleteOrderItemModal] = useState(false);

    const { deleteFetch, putFetch } = useFetchApi();
    const revalidator = useRevalidator();

    const handleShowModal = (order: any) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const deleteOrder = async (orderId: number) => {
        try {
            await deleteFetch(`/api/orders/${orderId}`);
            setShowDeleteOrderModal(false);
            setOrderToDelete(null);
            handleCloseModal();
            revalidator.revalidate();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const deleteOrderItem = async (orderItemId: number) => {
        try {

            const orderItem = orderItems.find(item => item.id === orderItemId);
            if (!orderItem) {
                console.error("Order item not found");
                return;
            }

            const orderId = orderItem.orderId;
            const order = orders.find(o => o.id === orderId);
            if (!order) {
                console.error("Order not found");
                return;
            }

            const itemCost = calculateRentalCost(
                order.orderDate,
                order.returnDate,
                orderItem.dailyPrice,
                orderItem.startFee
            );

            await deleteFetch(`/api/orderItems/${orderItemId}`);
            const newTotalPrice = order.totalPrice - itemCost;

            await putFetch(`/api/orders/${orderId}`, {
                totalPrice: newTotalPrice
            });

            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, totalPrice: newTotalPrice });
            }

            revalidator.revalidate();
        }
        catch (error) {
            console.error("Error deleting order item:", error);
        }
    };

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
    const matchesFilter = (order: any, filter: string) => {
        if (!filter) return true;
        const f = filter.toLowerCase();
        return order.id.toString().includes(f);
    };

    const ordersToDisplay = userOrdersFiltered.filter(order => matchesView(order, view) && matchesFilter(order, filter));

    useEffect(() => {
        setCurrentPage(1);
    }, [view]);

    const totalPages = Math.ceil(ordersToDisplay.length / pageSize);

    const getOrderItems = (orderId: number) =>
        orderItems.filter(item => item.orderId === orderId);

    const getLiftName = (liftId: number) => {
        const lift = lifts.find(l => l.id === liftId);
        return lift ? `${lift.name} (${lift.brand})` : "Okänd lift";
    };

    const getUserById = (id: number) =>
        users.find(u => u.id === id);

    return (
        <>
            <Container fluid className="my-5">
                <Row className="align-items-center justify-content-between">
                    <Col xs={12} lg={8} className="mx-0 px-0">
                        <Row className="g-3">
                            <Col xs={12} md={6} lg="auto">
                                <FilterDropdown
                                    options={[
                                        { label: "Alla", value: "all", variant: "primary" },
                                        { label: "Pågående", value: "current", variant: "success" },
                                        { label: "Kommande", value: "coming", variant: "info" },
                                        { label: "Avslutade", value: "closed", variant: "danger" },
                                    ]}
                                    selected={view}
                                    setSelected={setView}
                                    placeholder="Status"
                                />
                            </Col>
                            <Col xs={12} md={6} lg={4} className="my-3">
                                <SearchInput
                                    value={filter}
                                    onChange={setFilter}
                                    placeholder="Sök Order ID..."
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        xs={12}
                        lg={2}
                        className="d-flex justify-content-lg-end"
                    >

                    </Col>
                </Row>
            </Container>

            <Table striped bordered hover responsive className="orders-table">

                <thead>
                    <tr>
                        <th>Order ID</th>
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
                                            onClick={() => handleShowModal(order)}
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

            <OrderInfoModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                selectedOrder={selectedOrder}
                getOrderItems={getOrderItems}
                lifts={lifts}
                getLiftName={getLiftName}
                setOrderToDelete={setOrderToDelete}
                setShowDeleteOrderModal={setShowDeleteOrderModal}
                setOrderItemToDelete={setOrderItemToDelete}
                setShowDeleteOrderItemModal={setShowDeleteOrderItemModal}
            />

            <ConfirmationModal
                show={showDeleteOrderItemModal}
                setShow={setShowDeleteOrderItemModal}
                title="Ta bort orderobjekt"
                message={`Är du säker på att du vill ta bort ${getLiftName(orderItemToDelete?.liftId)} från order #${orderItemToDelete?.orderId}?`}
                onConfirm={async () => {
                    if (orderItemToDelete) await deleteOrderItem(orderItemToDelete.id);
                    setOrderItemToDelete(null);
                    setShowDeleteOrderItemModal(false);
                }}
            />

            <ConfirmationModal
                show={showDeleteOrderModal}
                setShow={setShowDeleteOrderModal}
                title="Ta bort order"
                message={`Är du säker på att du vill ta bort order #${orderToDelete?.id}?`}
                onConfirm={async () => {
                    if (orderToDelete) await deleteOrder(orderToDelete.id);
                    setOrderToDelete(null);
                }}
            />
        </>
    );
}
