import { Button, Col, Container, Row, Table } from "react-bootstrap";
import type User from "../../../interfaces/User";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import TablePagination from "../../../components/TablePagination";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import CreateUserModal from "./createUserModal";
import ConfirmationModal from "../../../components/ConfirmationModal";

export default function UserTab() {
    const { users } = useLoaderData() as { users: User[]; customerWithOrders: any[] };
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { postFetch, putFetch, deleteFetch } = useFetchApi();
    const revalidator = useRevalidator();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const pageSize = 10;

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "user"
    });

    const { sendForm, loading, errorMessage } = useSubmitForm(
        () => editingUserId
            ? putFetch(`/api/users/${editingUserId}`, user)
            : postFetch("/api/users", user)
    );

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string; value: string } = (event.target as HTMLInputElement);
        if (name === 'phone') {
            value = value.replace(/[^0-9+\-\s]/g, '');
        }
        setUser({ ...user, [name]: value });
    }

    async function handleSubmitUser(e: React.FormEvent) {
        const errorMsg = editingUserId ? "kunde inte uppdatera användaren" : "kunde inte skapa användaren";

        const success = await sendForm(e, undefined, errorMsg);
        if (success) {
            resetUser();
            setShowCreateModal(false);
            revalidator.revalidate();
        }
    };

    const resetUser = () => {
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "user"
        });
        setEditingUserId(null);
    }

    function handleCloseModal() {
        resetUser();
        setShowCreateModal(false);
    }

    const deleteUser = async (userId: number) => {
        try {
            await deleteFetch(`/api/users/${userId}`);
            setShowDeleteModal(false);
            revalidator.revalidate();
        } catch (error) {
            console.error("Kunde inte ta bort användaren:", error);
        }
    };

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

        <Container fluid className="my-5">
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
                        onClick={() => setShowCreateModal(true)}
                        size="lg"
                    >
                        Lägg till användare
                    </Button>
                </Col>
            </Row>
        </Container>

        <Table striped bordered hover>
            <thead >
                <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th >E-post</th>
                    <th>Telefon</th>
                    <th style={{ width: "120px" }}>Hantera</th>
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
                            <td className="d-flex gap-3 justify-content-center w-100">
                                <button
                                    className="btn btn-sm border-1 border-white"
                                    onClick={() => {
                                        setEditingUserId(user.id || null);
                                        setUser({
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email,
                                            phone: user.phone || "",
                                            role: user.role
                                        });
                                        setShowCreateModal(true);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-sm btn-danger bg-transparent"
                                    title="Ta bort"
                                    onClick={() => {
                                        setUserToDelete(user);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
        <ConfirmationModal
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            title="Ta bort användare"
            message={`Är du säker på att du vill ta bort användaren ${userToDelete?.firstName} ${userToDelete?.lastName}? Detta går inte att ångra.`}
            onConfirm={async () => {
                if (userToDelete) await deleteUser(userToDelete.id!);
                setUserToDelete(null);
                setShowDeleteModal(false);
            }
            }
        />
        <CreateUserModal
            show={showCreateModal}
            onHide={handleCloseModal}
            user={user}
            onInputChange={setProperty}
            onSubmit={handleSubmitUser}
            loading={loading}
            errorMessage={errorMessage}
            isEdit={!!editingUserId}
        />

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