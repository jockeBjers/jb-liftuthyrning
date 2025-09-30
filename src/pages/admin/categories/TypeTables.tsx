import { Table, Row, Col } from "react-bootstrap";
import type Fuel from "../../../interfaces/Fuel";
import type Category from "../../../interfaces/LiftCategory";


type TypeTablesProps = {
    fuels: Fuel[];
    liftCategories: Category[];
    handleEditClick: (item: Fuel | Category, type: "fuel" | "category") => void;
    setItemToDelete: (item: Fuel | Category) => void;
    setNewType: (type: "fuel" | "category") => void;
    setShowDeleteItemModal: (show: boolean) => void;
};

export default function TypeTables({
    fuels,
    liftCategories,
    handleEditClick,
    setItemToDelete,
    setNewType,
    setShowDeleteItemModal,
}: TypeTablesProps) {
    return (
        <Row className="m-0 g-4">
            <Col xs="12" md="6" className="px-2">
                <h2 className="text-white">Bränsletyp</h2>
                <Table striped bordered hover responsive>
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
                                <td>{fuel.name}</td>
                                <td className="d-flex gap-3 justify-content-center">
                                    <button
                                        className="btn btn-sm border-1 border-white"
                                        onClick={() => handleEditClick(fuel, "fuel")}
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

            <Col xs="12" md="6" className="px-2">
                <h2 className="text-white">Liftkategori</h2>
                <Table striped bordered hover responsive>
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
                                        onClick={() => handleEditClick(category, "category")}
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
    );
}
