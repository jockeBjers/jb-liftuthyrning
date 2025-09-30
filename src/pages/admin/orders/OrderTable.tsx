import { Table } from "react-bootstrap";
import type User from "../../../interfaces/User";

interface OrderTableProps {
    orders: any[];
    getUserById: (id: number) => User | undefined;
    handleShowModal: (order: any) => void;
    currentPage: number;
    pageSize: number;
}

export default function OrderTable({
    orders,
    getUserById,
    handleShowModal,
    currentPage,
    pageSize
}: OrderTableProps) {

    const start = (currentPage - 1) * pageSize;

    return (
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
                {orders.slice(start, start + pageSize).map(order => {
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
    );
}
