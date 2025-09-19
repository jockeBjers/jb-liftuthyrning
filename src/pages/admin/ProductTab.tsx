import { Table } from "react-bootstrap";
import CreateLift from "./createLiftModal";
import { useState } from "react";

export default function ProductTab({ lifts = [] }: {
    lifts: {
        id: number;
        name: string;
        brand: string;
        maxHeight: number;
        maxWeight: number;
        platformSize: string;
        dailyPrice: number;
        startFee: number;
        description: string;
        categoryId: number;
        fuelId: number;
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
            <Table striped bordered hover className="">
                <thead className="">
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
                        if (lift.fuelId == 1) {
                            fuelType = "El";
                        } else if (lift.fuelId == 2) {
                            fuelType = "Diesel";
                        }
                        let category = "";
                        if (lift.categoryId == 1) {
                            category = "Saxlift";
                        } else if (lift.categoryId == 2) {
                            category = "Bomlift";
                        }
                        else if (lift.categoryId == 3) {
                            category = "Pelarlift";
                        }

                        return (
                            <tr key={lift.id}>
                                <td>{lift.id}</td>
                                <td>{lift.name}</td>
                                <td className="d-none d-md-table-cell">{lift.brand}</td>
                                <td className="d-none d-md-table-cell">{lift.maxHeight}</td>
                                <td className="d-none d-md-table-cell">{lift.maxWeight}</td>
                                <td className="d-none d-md-table-cell">{lift.dailyPrice}</td>
                                <td className="d-none d-md-table-cell">{lift.startFee}</td>
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