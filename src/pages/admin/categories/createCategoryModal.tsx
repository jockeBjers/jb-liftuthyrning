import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface CreateCategoryModalProps {
    show: boolean;
    onHide: () => void;
    newType: "fuel" | "category";
    setNewType: (type: "fuel" | "category") => void;
    newName: string;
    setNewName: (name: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading?: boolean;
    errorMessage?: string;
}

export default function CreateCategoryModal({
    show,
    onHide,
    newType,
    setNewType,
    newName,
    setNewName,
    onSubmit,
    loading,
    errorMessage
}: CreateCategoryModalProps) {
    return (
        <Modal show={show} onHide={onHide} className="text-white">

            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>Lägg till ny</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className="bg-secondary">
                    <Form.Group className="mb-3">
                        <Form.Label className="d-block text-white">Typ</Form.Label>
                        <Form.Select
                            className="modern-input"
                            value={newType}
                            onChange={(e) =>
                                setNewType(e.target.value as "fuel" | "category")
                            }
                        >
                            <option value="fuel">Bränsle</option>
                            <option value="category">Kategori</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-block text-white">Namn</Form.Label>
                        <Form.Control
                            type="text"
                            className="modern-input"
                            placeholder="fyll i namn"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {errorMessage && (
                        <p className="text-danger">{errorMessage}</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-body border-secondary">
                    <Button variant="secondary" onClick={onHide}>
                        Avbryt
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Sparar...
                            </>
                        ) : (
                            "Lägg till " + (newType === "fuel" ? "bränsle" : "kategori")
                        )}

                        {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
