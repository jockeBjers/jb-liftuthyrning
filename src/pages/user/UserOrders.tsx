import { Button, Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { useState, useEffect } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useRevalidator } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import FilterButtons from "../../components/FilterButtons";
import TablePagination from "../../components/TablePagination";


export default function UserOrders({
    orders = [],
    orderItems = [],
    lifts = []


}: {
    orders: any[],
    orderItems: any[],
    lifts: any[],

}) {
    const { user } = useAuth();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
    const [userOrders, setUserOrders] = useState<any[]>([]);
    const { deleteFetch } = useFetchApi();
    const revalidator = useRevalidator();

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;





    const [view, setView] = useState<"all" | "current" | "coming" | "closed">("all");

    const categorizeOrders = (orders: any[]) => {
        const today = new Date();

        const all = orders;

        const current = orders.filter(o => {
            const start = new Date(o.orderDate);
            const end = new Date(o.returnDate);
            return start <= today && today <= end;
        });

        const coming = orders.filter(o => new Date(o.orderDate) > today);
        const closed = orders.filter(o => new Date(o.returnDate) < today);

        return { all, current, coming, closed };
    };

    const { all, current, coming, closed } = categorizeOrders(userOrders);

    const ordersToDisplay =
        view === "all"
            ? all
            : view === "current"
                ? current
                : view === "coming"
                    ? coming
                    : closed;
    useEffect(() => {
        setCurrentPage(1);
    }, [view]);


    useEffect(() => {
        if (user) {
            setUserOrders(orders.filter(order => order.userId === user.id));
        }
    }, [orders, user]);




    const canCancelOrder = (orderDateStr: string): boolean => {
        const today = new Date();
        const orderDate = new Date(orderDateStr);
        const daysUntilOrder = (orderDate.getTime() / (1000 * 60 * 60 * 24)) - (today.getTime() / (1000 * 60 * 60 * 24));
        return daysUntilOrder > 3;
    };

    const handleRemoveOrder = async (orderId: number) => {
        try {
            await deleteFetch(`/api/orders/${orderId}`);
            setShowCancelModal(false);
            setOrderToCancel(null);
            revalidator.revalidate();

        } catch (error) {
            console.error("Kunde inte ta bort order:", error);
            alert("Något gick fel.");
        }
    };

    const getOrderItems = (orderId: number) =>
        orderItems.filter(item => item.orderId === orderId);

    const getLiftName = (liftId: number) => {
        const lift = lifts.find(l => l.id === liftId);
        return `${lift?.name} (${lift?.brand})`;
    };

    const totalPages = Math.ceil(ordersToDisplay.length / pageSize);

    const paginatedOrders = ordersToDisplay.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );


    return (
        <Container className="mb-5">
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

            <h2 className="text-primary mb-4">Ordrar</h2>
            {userOrders.length === 0 ? (
                <p>Du har inga ordrar.</p>
            ) : (
                paginatedOrders.map(order => {
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
                            <div className="width-100 d-flex justify-content-between">
                                <p>
                                    <strong>Totalt pris för order:</strong> {order.totalPrice} kr
                                </p>
                                {canCancelOrder(order.orderDate) && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setOrderToCancel(order.id);
                                            setShowCancelModal(true);
                                        }}
                                        className="bg-transparent border-1 text-danger text-end"
                                    >
                                        Avbryt beställning
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
            {totalPages > 1 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

            )}

            <DeleteConfirmationModal
                showCancelModal={showCancelModal}
                setShowCancelModal={setShowCancelModal}
                orderToCancel={orderToCancel}

                handleRemoveOrder={handleRemoveOrder}
                userOrders={userOrders}
            />
        </Container>
    );
}
