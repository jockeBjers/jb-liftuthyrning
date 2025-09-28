import { Table } from "react-bootstrap";

type UserTableProps = {
    users: any[];
    onEdit: (user: any) => void;
    onDelete: (user: any) => void;
    currentPage: number;
    pageSize: number;
};

export default function UserTable({ users, onEdit, onDelete, currentPage, pageSize }: UserTableProps) {
    const start = (currentPage - 1) * pageSize;
    const pageData = users.slice(start, start + pageSize);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th>E-post</th>
                    <th>Telefon</th>
                    <th style={{ width: "120px" }}>Hantera</th>
                </tr>
            </thead>
            <tbody>
                {pageData.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || '—'}</td>
                        <td className="d-flex gap-3 justify-content-center w-100">
                            <button className="btn btn-sm border-1 border-white" onClick={() => onEdit(user)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-danger bg-transparent" onClick={() => onDelete(user)}>
                                <i className="bi bi-trash text-danger"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
