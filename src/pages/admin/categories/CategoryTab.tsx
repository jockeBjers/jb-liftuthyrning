import { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import CreateCategoryModal from "./createCategoryModal";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { useRevalidator } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";


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
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

    const [itemToDelete, setItemToDelete] = useState<any | null>(null);
    const revalidator = useRevalidator();
    const { postFetch, deleteFetch } = useFetchApi();

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

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            if ("fuelId" in itemToDelete || newType === "fuel") {
                await deleteFetch(`/api/fuels/${itemToDelete.id}`);
            } else {
                await deleteFetch(`/api/liftCategories/${itemToDelete.id}`);
            }

            revalidator.revalidate();
            setShowDeleteItemModal(false);
            setItemToDelete(null);
        } catch (error) {
            console.error("Kunde inte ta bort objektet:", error);
            alert("Något gick fel vid borttagning.");
        }
    };

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
                                <th className="px-2">#</th>
                                <th className="w-100">Typ</th>
                                <th>Hantera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fuels.map((fuel) => (
                                <tr key={fuel.id}>
                                    <td className="px-2">{fuel.id}</td>
                                    <td >{fuel.name}</td>
                                    <td className="d-flex gap-3 justify-content-center">
                                        <button
                                            className="btn btn-sm border-1 border-white"
                                            onClick={() => {

                                            }}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger bg-transparent"
                                            title="Ta bort"
                                            onClick={() => {
                                                setItemToDelete(fuel);
                                                setNewType("fuel");
                                                setShowDeleteItemModal(true);
                                            }}
                                        >
                                            <i className="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
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
                                <th className="px-2">#</th>
                                <th className="w-100">Kategori</th>
                                <th>Hantera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liftCategories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-2">{category.id}</td>
                                    <td>{category.name}</td>
                                    <td className="d-flex gap-3 justify-content-center">
                                        <button
                                            className="btn btn-sm border-1 border-white"
                                            onClick={() => {

                                            }}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger bg-transparent"
                                            title="Ta bort"
                                            onClick={() => {
                                                setItemToDelete(category);
                                                setNewType("category");
                                                setShowDeleteItemModal(true);
                                            }}
                                        >
                                            <i className="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <ConfirmationModal
                show={showDeleteItemModal}
                setShow={setShowDeleteItemModal}
                title="Bekräfta borttagning"
                message={`Är du säker på att du vill ta bort ? Detta går inte att ångra.`}
                onConfirm={handleDelete}
                confirmText="Ta bort"
                confirmVariant="danger"
            />

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
