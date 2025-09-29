import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import FilterDropdown from "../../../components/FilterDropdown";
import SearchInput from "../../../components/SearchInput";
import OrderPagination from "../../../components/TablePagination";
import type User from "../../../interfaces/User";
import { useLoaderData } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import OrderInfoModal from "./OrderInfoModal";
import OrderTable from "./OrderTable";
import { useOrderModals } from "../../../utils/OrderModals";

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

    const {
        selectedOrder, showModal, handleShowModal, handleCloseModal,
        showDeleteOrderModal, setShowDeleteOrderModal,
        showDeleteOrderItemModal, setShowDeleteOrderItemModal,
        orderToDelete, setOrderToDelete,
        orderItemToDelete, setOrderItemToDelete,
        deleteOrder, deleteOrderItem,
        getOrderItems, getLiftName,
        deleteMessage
    } = useOrderModals(orders, orderItems, lifts);

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

            <OrderTable
                orders={ordersToDisplay}
                getUserById={getUserById}
                handleShowModal={handleShowModal}
                currentPage={currentPage}
                pageSize={pageSize}
            />


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
                message={deleteMessage}
                onConfirm={async () => {
                    if (!orderItemToDelete) return;

                    if (getOrderItems(orderItemToDelete.orderId).length === 1) {
                        await deleteOrder(orderItemToDelete.orderId);
                    } else {
                        await deleteOrderItem(orderItemToDelete.id);
                    }

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
