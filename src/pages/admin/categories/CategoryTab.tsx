import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import CreateCategoryModal from "./createCategoryModal";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import type Fuel from "../../../interfaces/Fuel";
import type Category from "../../../interfaces/LiftCategory";
import TypeTables from "./TypeTables";

export default function CategoryTab() {
    const { fuels, liftCategories, } = useLoaderData() as {
        fuels: Fuel[];
        liftCategories: Category[];
    };
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newType, setNewType] = useState<"fuel" | "category">("fuel");
    const [newName, setNewName] = useState("");
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    const [itemToDelete, setItemToDelete] = useState<any | null>(null);
    const revalidator = useRevalidator();
    const { postFetch, deleteFetch, putFetch } = useFetchApi();

    const { sendForm, loading, errorMessage } = useSubmitForm(() => {

        if (editingItemId) {
            return newType === "fuel"
                ? putFetch(`/api/fuels/${editingItemId}`, { name: newName })
                : putFetch(`/api/liftCategories/${editingItemId}`, { name: newName });
        } else {
            return newType === "fuel"
                ? postFetch("/api/fuels", { name: newName })
                : postFetch("/api/liftCategories", { name: newName });
        }
    });


    async function handleSubmit(e: React.FormEvent) {
        const errorMsg = editingItemId
            ? (newType === "fuel" ? "Kunde inte uppdatera bränsle" : "Kunde inte uppdatera kategori")
            : (newType === "fuel" ? "Kunde inte skapa bränsle" : "Kunde inte skapa kategori");

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
        setEditingItemId(null);
    }

    function handleCloseModal() {
        resetForm();
        setShowCreateModal(false);
    }

    function handleEditClick(item: Fuel | Category, type: "fuel" | "category") {
        setEditingItemId(item.id);
        setNewType(type);
        setNewName(item.name);
        setShowCreateModal(true);
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
            <Container fluid className="my-5">
                <Row className="align-items-center justify-content-between">
                    <Col xs={12} lg={8}>
                    </Col>
                    <Col
                        sm={12}
                        md={6}
                        lg={3}
                        className="d-flex justify-content-lg-end"
                    >
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            size="lg" className="w-100"
                        >
                            Lägg till kategori eller bränsle
                        </Button>
                    </Col>
                </Row>
            </Container>
            <TypeTables
                fuels={fuels}
                liftCategories={liftCategories}
                handleEditClick={handleEditClick}
                setItemToDelete={setItemToDelete}
                setNewType={setNewType}
                setShowDeleteItemModal={setShowDeleteItemModal}
            />

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
                isEditing={editingItemId !== null}
            />
        </>
    );
}