import { Button, Col, Container, Row, Table } from "react-bootstrap";
import type User from "../../../interfaces/User";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import TablePagination from "../../../components/TablePagination";

export default function UserTab() {
    const { users } = useLoaderData() as { users: User[]; customerWithOrders: any[] };
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const usersToDisplay = users.filter(l => {

        const matchesFilter =
            !filter ||
            l.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            l.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            l.email.toLowerCase().includes(filter.toLowerCase())

        return matchesFilter;
    });

    const totalPages = Math.ceil(usersToDisplay.length / pageSize);

    return (<>

        <Container fluid className=" my-5">
            <Row className="align-items-center g-0">
                <Col xs="12" md="8">
                    <Row className="align-items-center g-2">
                        <Col xs="auto">

                        </Col>
                        <Col xs="12" md="4">
                            <input
                                type="text"
                                className="modern-input form-control p-2"
                                placeholder="Sök bland Användare..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col xs="12" md="4" className="d-flex justify-content-md-end">
                    <Button
                        onClick={() => { }}
                        size="lg"
                    >
                        Lägg till ny användare
                    </Button>
                </Col>
            </Row>

        </Container>

        <Table striped bordered hover>
            <thead >
                <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th>E-post</th>
                    <th>Telefon</th>
                    <th>Hantera</th>
                </tr>
            </thead>
            <tbody>
                {usersToDisplay.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || '—'}</td>
                            <td>
                                <button
                                    className="btn btn-sm w-100"
                                    onClick={() => console.log('View user details:', user.id)}
                                >
                                    Visa detaljer
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>

        {totalPages > 1 && (
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        )}
    </>
    );
}