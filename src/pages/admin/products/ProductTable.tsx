
import { Table } from "react-bootstrap";

type LiftTableProps = {
    lifts: any[];
    onEdit: (lift: any) => void;
    onDelete: (lift: any) => void;
};

export default function LiftTable({ lifts, onEdit, onDelete }: LiftTableProps) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Namn</th>
                    <th>Märke</th>
                    <th>Maxhöjd</th>
                    <th>Maxvikt</th>
                    <th>Korgstorlek</th>
                    <th>Dagspris</th>
                    <th>Startavgift</th>
                    <th>Bränsletyp</th>
                    <th>Kategori</th>
                    <th className="d-none d-md-table-cell">Beskrivning</th>
                    <th>Hantera</th>
                </tr>
            </thead>
            <tbody>
                {lifts.map((lift) => (
                    <tr key={lift.id}>
                        <td>{lift.id}</td>
                        <td>{lift.name}</td>
                        <td>{lift.brand}</td>
                        <td>{lift.maxHeight}</td>
                        <td>{lift.maxWeight}</td>
                        <td>{lift.platformSize}</td>
                        <td>{lift.dailyPrice}</td>
                        <td>{lift.startFee}</td>
                        <td>{lift.fuelName}</td>
                        <td>{lift.categoryName}</td>
                        <td className="d-none d-md-table-cell">
                            {lift.description.length > 40
                                ? `${lift.description.substring(0, 40)}...`
                                : lift.description}
                        </td>
                        <td className="d-flex gap-3 justify-content-center">
                            <button
                                className="btn btn-sm border-1 border-white"
                                onClick={() => onEdit(lift)}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-danger bg-transparent"
                                title="Ta bort"
                                onClick={() => onDelete(lift)}
                            >
                                <i className="bi bi-trash text-danger"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
