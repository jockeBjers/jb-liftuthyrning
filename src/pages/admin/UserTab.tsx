import { Table } from "react-bootstrap";
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

export default function UserTab({
    users = [],
    customerWithOrders = []
}: {
    users: User[];
    customerWithOrders: any[];
}) {

    return (
        <Table striped bordered hover className="table-dark">
            <thead className="table-dark text-white">
                <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th>E-post</th>
                    <th>Telefon</th>
                    <th>Hantera</th>
                </tr>
            </thead>
            <tbody>
                {users
                    .filter(user => customerWithOrders.some(c => c.user_id === user.id && c.order_id !== null))
                    .map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || '-'}</td>
                            <td>
                                <button
                                    className="btn btn-sm w-100"
                                    onClick={() => console.log('View user details:', user.id)}
                                >
                                    Visa detaljer
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}