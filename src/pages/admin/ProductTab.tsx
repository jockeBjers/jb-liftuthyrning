import { Table } from "react-bootstrap";
import CreateLift from "./createLiftModal";
import { useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useRevalidator } from "react-router-dom";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import ConfirmationModal from "../../components/ConfirmationModal";
import FilterButtons from "../../components/FilterButtons";

export default function ProductTab({ liftDetails = [] }: { liftDetails: any[] }) {
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
    const { postFetch, putFetch, deleteFetch } = useFetchApi();
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

    const liftsToDisplay = liftDetails.filter(l => {

        const matchesView =
            view === "all" ||
            (view === "saxlift" && l.categoryName === "Saxlift") ||
            (view === "bomlift" && l.categoryName === "Bomlift") ||
            (view === "pelarlift" && l.categoryName === "Pelarlift") ||
            (view === "el" && l.fuelName === "el") ||
            (view === "diesel" && l.fuelName === "diesel");

        const matchesFilter =
            !filter ||
            l.name.toLowerCase().includes(filter.toLowerCase()) ||
            l.brand.toLowerCase().includes(filter.toLowerCase()) ||
            l.description.toLowerCase().includes(filter.toLowerCase()) ||
            l.categoryName.toLowerCase().includes(filter.toLowerCase()) ||
            l.fuelName.toLowerCase().includes(filter.toLowerCase()) ||
            l.platformSize.toLowerCase().includes(filter.toLowerCase()) ||
            l.maxHeight.toString().includes(filter) ||
            l.maxWeight.toString().includes(filter) ||
            l.dailyPrice.toString().includes(filter) ||
            l.startFee.toString().includes(filter);

        return matchesView && matchesFilter;
    });

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-0">
                <div className="d-flex flex-row flex-md-row gap-3 mb-3 mb-md-0 align-items-center">
                    <FilterButtons
                        options={[

                            { label: "Alla", value: "all", variant: "primary", textColor: "text-white" },
                            { label: "Saxliftar", value: "saxlift", variant: "primary", textColor: "text-white" },
                            { label: "Bomliftar", value: "bomlift", variant: "primary", textColor: "text-white" },
                            { label: "Pelarliftar", value: "pelarlift", variant: "primary", textColor: "text-white" },
                            { label: "El", value: "el", variant: "success", textColor: "text-white" },
                            { label: "Diesel", value: "diesel", variant: "warning", textColor: "text-secondary" },
                        ]}
                        selected={view}
                        setSelected={setView}
                    />
                    <div className="flex justify-content-center align-items-center">

                        <input
                            type="text"
                            className="modern-input form-control p-2"
                            placeholder="Sök bland liftar..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className=" ">
                    <button onClick={() => setShowCreateModal(true)} className="me-3 btn btn-primary btn-lg">
                        Lägg till ny lift
                    </button>
                </div>

                <CreateLift
                    show={showCreateModal}
                    onHide={handleCloseModal}
                    lift={lift}
                    onInputChange={setProperty}
                    onSubmit={handleSubmitLift}
                    loading={loading}
                    errorMessage={errorMessage}
                    isEdit={editingLiftId !== null}
                />

            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Namn</th>
                        <th className="d-none d-md-table-cell">Märke</th>
                        <th className="d-none d-md-table-cell">Maxhöjd</th>
                        <th className="d-none d-md-table-cell">Maxvikt</th>
                        <th className="d-none d-md-table-cell">Korgstorlek</th>
                        <th className="d-none d-md-table-cell">Dagspris</th>
                        <th className="d-none d-md-table-cell">Startavgift</th>
                        <th className="d-none d-md-table-cell">Bränsletyp</th>
                        <th className="d-none d-md-table-cell">Kategori</th>
                        <th className="d-none d-lg-table-cell">Beskrivning</th>
                        <th>Hantera</th>
                    </tr>
                </thead>
                <tbody>
                    {liftsToDisplay.map((lift) => (
                        <tr key={lift.id}>
                            <td>{lift.id}</td>
                            <td>{lift.name}</td>
                            <td className="d-none d-md-table-cell">{lift.brand}</td>
                            <td className="d-none d-md-table-cell">{lift.maxHeight}</td>
                            <td className="d-none d-md-table-cell">{lift.maxWeight}</td>
                            <td className="d-none d-md-table-cell">{lift.platformSize}</td>
                            <td className="d-none d-md-table-cell">{lift.dailyPrice}</td>
                            <td className="d-none d-md-table-cell">{lift.startFee}</td>
                            <td className="d-none d-md-table-cell">{lift.fuelName}</td>
                            <td className="d-none d-md-table-cell">{lift.categoryName}</td>
                            <td className="d-none d-lg-table-cell">{lift.description}</td>
                            <td className="d-flex gap-3 justify-content-center">
                                <button
                                    className="btn btn-sm border-1 border-white"
                                    onClick={() => {
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
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-sm btn-danger bg-transparent"
                                    title="Ta bort"
                                    onClick={() => {
                                        setLiftToDelete(lift);
                                        setShowDeleteLiftModal(true);
                                    }}
                                >
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
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


            </Table>
        </>
    );
}
