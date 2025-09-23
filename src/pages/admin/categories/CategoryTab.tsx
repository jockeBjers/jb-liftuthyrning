import { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import CreateCategoryModal from "./createCategoryModal";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { useRevalidator } from "react-router-dom";


export default function CategoryTab({
    fuels = [],
    liftCategories = []
}: {
    fuels: { id: number; name: string }[];
    liftCategories: { id: number; name: string }[];
}) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newType, setNewType] = useState<"fuel" | "category">("fuel");
    const [newName, setNewName] = useState("");

    const revalidator = useRevalidator();
    const { postFetch } = useFetchApi();

    const { sendForm, loading, errorMessage } = useSubmitForm(() =>
        newType === "fuel"
            ? postFetch("/api/fuels", { name: newName })
            : postFetch("/api/liftCategories", { name: newName })
    );

    async function handleSubmit(e: React.FormEvent) {
        const errorMsg =
            newType === "fuel"
                ? "Kunde inte skapa bränsle"
                : "Kunde inte skapa kategori";

        const success = await sendForm(e, undefined, errorMsg);
        if (success) {
            resetForm();
            setShowCreateModal(false);
            revalidator.revalidate();
        }
    }

    function resetForm() {
        setNewType("fuel");
        setNewName("");
    }
    function handleCloseModal() {
        resetForm();
        setShowCreateModal(false);
    }

    return (
        <>
            <Row className="m-0 g-4 mb-3">
                <div>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-lg"
                    >
                        Lägg till kategori eller bränsle
                    </Button>
                </div>

                <Col xs="12" md="6" className="p-2">
                    <h2 className="text-white">Bränsletyp</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Typ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fuels.map((fuel) => (
                                <tr key={fuel.id}>
                                    <td>{fuel.id}</td>
                                    <td>{fuel.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Col xs="12" md="6" className="p-2">
                    <h2 className="text-white">Liftkategori</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kategori</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liftCategories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <CreateCategoryModal
                show={showCreateModal}
                onHide={handleCloseModal}
                newType={newType}
                setNewType={setNewType}
                newName={newName}
                setNewName={setNewName}
                onSubmit={handleSubmit}
                loading={loading}
                errorMessage={errorMessage}
            />
        </>
    );
}
