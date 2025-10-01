import { Button, Col, Container, Row } from "react-bootstrap";
import type User from "../../../interfaces/User";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import TablePagination from "../../../components/TablePagination";
import { apiUtil } from "../../../utils/apiUtil";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import CreateUserModal from "./CreateUserModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import SearchInput from "../../../components/SearchInput";
import UserTable from "./UserTable";

export default function UserTab() {
    const { users } = useLoaderData() as { users: User[]; };
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { postFetch, putFetch, deleteFetch } = apiUtil();
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
        role: ""
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
            role: ""
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


    const matchesFilter = (l: any, filter: string) => {
        if (!filter) return true;
        const f = filter.toLowerCase();
        return l.firstName.toLowerCase().includes(f) ||
            l.lastName.toLowerCase().includes(f) ||
            l.email.toLowerCase().includes(f);
    };

    const usersToDisplay = users.filter((user) => matchesFilter(user, filter));

    const totalPages = Math.ceil(usersToDisplay.length / pageSize);

    usersToDisplay.sort((a, b) => {
        const nameA = `${a.firstName}`.toLowerCase();
        const nameB = `${b.firstName}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    return (<>

        <Container fluid className="my-5">
            <Row className="align-items-center justify-content-between g-0">
                <Col xs="12" md="8">
                    <Row className="align-items-center g-2">
                        <Col xs="auto">
                        </Col>
                        <Col xs="12" md="6" lg="4" className="my-3">
                            <SearchInput
                                value={filter}
                                onChange={setFilter}
                                placeholder="Sök bland Användare..."
                            />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={12}
                    lg={2}
                    className="d-flex justify-content-lg-end"
                >
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        size="lg" className="w-100 w-lg-auto">
                        Lägg till användare
                    </Button>
                </Col>
            </Row>
        </Container>

        <UserTable
            users={usersToDisplay}
            currentPage={currentPage}
            pageSize={pageSize}
            onEdit={(user) => {
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
            onDelete={(user) => {
                setUserToDelete(user);
                setShowDeleteModal(true);
            }}
        />

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