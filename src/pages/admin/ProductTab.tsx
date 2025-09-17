import { Table } from "react-bootstrap";
import CreateLift from "./createLiftModal";
import { useState } from "react";

export default function ProductTab({ lifts = [] }: {
    lifts: {
        id: number;
        name: string;
        brand: string;
        max_height: number;
        max_weight: number;
        platform_size: string;
        daily_price: number;
        start_fee: number;
        description: string;
        category_id: number;
        fuel_id: number;
    }[]

}) {

    const [showCreateModal, setShowCreateModal] = useState(false);

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
                />
            </div>
            <Table striped bordered hover className="table-dark">
                <thead className="table-dark text-white">
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
                    {lifts.map((lift) => {
                        let fuelType = "";
                        if (lift.fuel_id == 1) {
                            fuelType = "El";
                        } else if (lift.fuel_id == 2) {
                            fuelType = "Diesel";
                        }
                        let category = "";
                        if (lift.category_id == 1) {
                            category = "Saxlift";
                        } else if (lift.category_id == 2) {
                            category = "Bomlift";
                        }
                        else if (lift.category_id == 3) {
                            category = "Pelarlift";
                        }

                        return (
                            <tr key={lift.id}>
                                <td>{lift.id}</td>
                                <td>{lift.name}</td>
                                <td className="d-none d-md-table-cell">{lift.brand}</td>
                                <td className="d-none d-md-table-cell">{lift.max_height}</td>
                                <td className="d-none d-md-table-cell">{lift.max_weight}</td>
                                <td className="d-none d-md-table-cell">{lift.daily_price}</td>
                                <td className="d-none d-md-table-cell">{lift.start_fee}</td>
                                <td className="d-none d-md-table-cell">{fuelType}</td>
                                <td className="d-none d-md-table-cell">{category}</td>
                                <td className="d-none d-lg-table-cell">{lift.description}</td>
                                <td>
                                    <button
                                        className="btn btn-sm w-100"
                                        onClick={() => console.log('View lift details:', lift.id)}
                                    >
                                        Visa detaljer
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table></>
    );
}