import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { apiUtil } from "../../../utils/apiUtil";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import ConfirmationModal from "../../../components/ConfirmationModal";
import FilterDropdown from "../../../components/FilterDropdown";
import SearchInput from "../../../components/SearchInput";
import type Fuel from "../../../interfaces/Fuel";
import type Category from "../../../interfaces/LiftCategory";
import LiftTable from "./ProductTable";
import CreateLiftModal from "./CreateLiftModal";

export default function ProductTab() {
    const { liftDetails, fuels, liftCategories } = useLoaderData() as {
        liftDetails: any[];
        fuels: Fuel[];
        liftCategories: Category[];
    };
    const [lift, setLift] = useState({
        name: '',
        brand: '',
        maxHeight: 0,
        maxWeight: 0,
        platformSize: '',
        dailyPrice: 0,
        startFee: 0,
        description: '',
        categoryId: 1,
        fuelId: 1
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingLiftId, setEditingLiftId] = useState<number | null>(null);
    const { postFetch, putFetch, deleteFetch } = apiUtil();
    const revalidator = useRevalidator();
    const [showDeleteLiftModal, setShowDeleteLiftModal] = useState(false);
    const [liftToDelete, setLiftToDelete] = useState<any | null>(null);
    const [view, setView] = useState<"all" | "saxlift" | "bomlift" | "pelarlift" | "el" | "diesel">("all");
    const [filter, setFilter] = useState("");

    const { sendForm, loading, errorMessage } = useSubmitForm(
        () => editingLiftId
            ? putFetch(`/api/lifts/${editingLiftId}`, lift)
            : postFetch("/api/lifts", lift)
    );

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string | number | null } =
            event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (['maxHeight', 'maxWeight', 'dailyPrice', 'startFee', 'categoryId', 'fuelId'].includes(name)) {
            value = isNaN(+value) ? 0 : +value;
        }

        setLift({ ...lift, [name]: value });
    }

    async function handleSubmitLift(e: React.FormEvent) {
        const errorMsg = editingLiftId
            ? "Kunde inte uppdatera lift"
            : "Kunde inte skapa lift";

        const success = await sendForm(e, undefined, errorMsg);
        if (success) {
            resetLift();
            setShowCreateModal(false);
            revalidator.revalidate();
        }
    }

    function resetLift() {
        setLift({
            name: '',
            brand: '',
            maxHeight: 0,
            maxWeight: 0,
            platformSize: '',
            dailyPrice: 0,
            startFee: 0,
            description: '',
            categoryId: 1,
            fuelId: 1
        });
        setEditingLiftId(null);
    }

    function handleCloseModal() {
        resetLift();
        setShowCreateModal(false);
    }

    const deleteLift = async (liftId: number) => {
        try {
            await deleteFetch(`/api/lifts/${liftId}`);
            setShowDeleteLiftModal(false);
            revalidator.revalidate();

        } catch (error) {
            console.error("Kunde inte ta bort liften:", error);
            alert("Något gick fel.");
        }
    };

    function matchesView(l: any) {
        if (view === "all") return true;

        const matchesCategory = liftCategories.some(category =>
            view === category.name.toLowerCase() && l.categoryName === category.name
        );

        const matchesFuel = fuels.some(fuel =>
            view === fuel.name.toLowerCase() && l.fuelName.toLowerCase() === fuel.name.toLowerCase()
        );

        return matchesCategory || matchesFuel;
    }

    const matchesFilter = (l: any, filter: string) => {
        if (!filter) return true;
        const f = filter.toLowerCase();
        return l.name.toLowerCase().includes(f) ||
            l.brand.toLowerCase().includes(f) ||
            l.description.toLowerCase().includes(f) ||
            l.categoryName.toLowerCase().includes(filter.toLowerCase()) ||
            l.fuelName.toLowerCase().includes(filter.toLowerCase()) ||
            l.platformSize.toLowerCase().includes(filter.toLowerCase()) ||
            l.maxHeight.toString().includes(filter) ||
            l.maxWeight.toString().includes(filter) ||
            l.dailyPrice.toString().includes(filter) ||
            l.startFee.toString().includes(filter);
    };

    const liftsToDisplay = liftDetails.filter(l => matchesView(l) && matchesFilter(l, filter));

    const filterOptions = [
        { label: "Alla", value: "all", variant: "primary" },
        ...liftCategories.map(category => ({
            label: `${category.name}ar`,
            value: category.name.toLowerCase(),
            variant: "primary"
        })),
        ...fuels.map(fuel => ({
            label: fuel.name,
            value: fuel.name.toLowerCase(),
            variant: "primary"
        }))
    ];

    return (
        <>
            <Container fluid className="my-5">
                <Row className="align-items-center justify-content-between">
                    <Col xs={12} lg={8} className="mx-0 px-0">
                        <Row className="g-3">
                            <Col xs={12} md={6} lg="auto">
                                <FilterDropdown
                                    options={filterOptions}
                                    selected={view}
                                    setSelected={setView}
                                    placeholder="Kategori"
                                />
                            </Col>
                            <Col xs={12} md={6} lg={4} className="my-3">
                                <SearchInput
                                    value={filter}
                                    onChange={setFilter}
                                    placeholder="Sök bland liftar..."
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col
                        xs={12}
                        lg={2}
                        className="d-flex justify-content-lg-end"
                    >
                        <Button onClick={() => setShowCreateModal(true)} size="lg" className="w-100 w-lg-auto">
                            Lägg till ny lift
                        </Button>
                    </Col>
                </Row>
            </Container>

            <LiftTable
                lifts={liftsToDisplay}
                onEdit={(lift) => {
                    setEditingLiftId(lift.id);
                    setLift({
                        name: lift.name,
                        brand: lift.brand,
                        maxHeight: lift.maxHeight,
                        maxWeight: lift.maxWeight,
                        platformSize: lift.platformSize,
                        dailyPrice: lift.dailyPrice,
                        startFee: lift.startFee,
                        description: lift.description,
                        categoryId: lift.categoryId,
                        fuelId: lift.fuelId
                    });
                    setShowCreateModal(true);
                }}
                onDelete={(lift) => {
                    setLiftToDelete(lift);
                    setShowDeleteLiftModal(true);
                }}
            />

            <CreateLiftModal
                show={showCreateModal}
                onHide={handleCloseModal}
                lift={lift}
                onInputChange={setProperty}
                onSubmit={handleSubmitLift}
                loading={loading}
                errorMessage={errorMessage}
                isEdit={editingLiftId !== null}
                fuels={fuels}
                liftCategories={liftCategories}
            />
            <ConfirmationModal
                show={showDeleteLiftModal}
                setShow={setShowDeleteLiftModal}
                title="Ta bort lift"
                message={`Är du säker på att du vill ta bort liften "${liftToDelete?.name}"?`}
                onConfirm={async () => {
                    if (liftToDelete) await deleteLift(liftToDelete.id);
                    setLiftToDelete(null);
                }}
            />
        </>
    );
}
