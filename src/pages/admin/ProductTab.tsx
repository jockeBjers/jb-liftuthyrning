import { Table } from "react-bootstrap";
import CreateLift from "./createLiftModal";
import { useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import { useRevalidator } from "react-router-dom";
import { useSubmitForm } from "../../hooks/useSubmitForm";

export default function ProductTab({ liftDetails = [] }: { liftDetails: any[] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
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

    const { postFetch } = useFetchApi();
    const revalidator = useRevalidator();
    const { sendForm, loading, errorMessage } = useSubmitForm(
        () => postFetch("/api/lifts", lift)
    );

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string | number | null } =
            event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (['maxHeight', 'maxWeight', 'dailyPrice', 'startFee', 'categoryId', 'fuelId'].includes(name)) {
            value = isNaN(+value) ? 0 : +value;
        }

        setLift({ ...lift, [name]: value });
    }

    async function handleCreateLift(e: React.FormEvent) {
        const success = await sendForm(e);
        if (success) {
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
            setShowCreateModal(false);
            revalidator.revalidate();
        }
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
                    onHide={() => setShowCreateModal(false)}
                    lift={lift}
                    onInputChange={setProperty}
                    onSubmit={handleCreateLift}
                    loading={loading}
                    errorMessage={errorMessage}
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
                            <td className="d-none d-md-table-cell">{lift.dailyPrice}</td>
                            <td className="d-none d-md-table-cell">{lift.startFee}</td>
                            <td className="d-none d-md-table-cell">{lift.fuelName}</td>
                            <td className="d-none d-md-table-cell">{lift.categoryName}</td>
                            <td className="d-none d-lg-table-cell">{lift.description}</td>
                            <td>
                                <button
                                    className="btn btn-sm w-100"
                                    onClick={() => console.log("View lift details:", lift.id)}
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
