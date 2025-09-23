import { Table } from "react-bootstrap";
import CreateLift from "./createLiftModal";
import { useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useRevalidator } from "react-router-dom";
import { useSubmitForm } from "../../hooks/useSubmitForm";

export default function ProductTab({ liftDetails = [] }: { liftDetails: any[] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingLiftId, setEditingLiftId] = useState<number | null>(null);
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

    const { postFetch, putFetch } = useFetchApi();
    const revalidator = useRevalidator();

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


    return (
        <>
            <div>
                <div className="mb-3">
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
                    {liftDetails.map((lift) => (
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
                            <td>
                                <button
                                    className="btn btn-sm w-100"
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
                                    Redigera
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
