import { Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap';

interface CreateLiftProps {
    show: boolean;
    onHide: () => void;
    lift: {
        id?: number;
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
    };
    onInputChange: (event: React.ChangeEvent) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    errorMessage: string | null;
    isEdit?: boolean;
}

export default function CreateLiftModal({
    show,
    onHide,
    lift,
    onInputChange,
    onSubmit,
    loading,
    errorMessage,
    isEdit = false
}: CreateLiftProps) {

    return (
        <Modal show={show} onHide={onHide} size="lg" className="text-white">
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>
                    {isEdit ? "Redigera lift" : "Lägg till ny lift"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className="bg-secondary">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Namn</p>
                                    <Form.Control
                                        className="modern-input"
                                        onChange={onInputChange}
                                        type="text"
                                        name="name"
                                        placeholder="Lift namn"
                                        value={lift.name}
                                        required
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className="mt-2">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Märke</p>
                                    <Form.Control
                                        className="modern-input"
                                        onChange={onInputChange}
                                        type="text"
                                        name="brand"
                                        placeholder="Märke"
                                        value={lift.brand}
                                        required
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Row className="mt-2 g-2">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="d-block text-white">
                                            <p className="mb-1">Max höjd (m)</p>
                                            <Form.Control
                                                className="modern-input"
                                                onChange={onInputChange}
                                                type="number"
                                                name="maxHeight"
                                                placeholder="10"
                                                value={lift.maxHeight || ''}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="d-block text-white">
                                            <p className="mb-1">Max vikt (kg)</p>
                                            <Form.Control
                                                className="modern-input"
                                                onChange={onInputChange}
                                                type="number"
                                                name="maxWeight"
                                                placeholder="200"
                                                value={lift.maxWeight || ''}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mt-2">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Plattformsstorlek</p>
                                    <Form.Control
                                        className="modern-input"
                                        onChange={onInputChange}
                                        type="text"
                                        name="platformSize"
                                        placeholder="2x2m"
                                        value={lift.platformSize}
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Row className="mt-2 g-2">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="d-block text-white">
                                            <p className="mb-1">Dagspris (kr)</p>
                                            <Form.Control
                                                className="modern-input"
                                                onChange={onInputChange}
                                                type="number"
                                                name="dailyPrice"
                                                placeholder="500"
                                                value={lift.dailyPrice || ''}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="d-block text-white">
                                            <p className="mb-1">Startavgift (kr)</p>
                                            <Form.Control
                                                className="modern-input"
                                                onChange={onInputChange}
                                                type="number"
                                                name="startFee"
                                                placeholder="200"
                                                value={lift.startFee || ''}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="text-white">
                                            <p className="mb-1">Bränsletyp</p>
                                            <Form.Select
                                                className="modern-input"
                                                name="fuelId"
                                                onChange={onInputChange}
                                                value={lift.fuelId}
                                            >
                                                <option value={1}>El</option>
                                                <option value={2}>Diesel</option>
                                            </Form.Select>
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="text-white">
                                            <p className="mb-1">Kategori</p>
                                            <Form.Select
                                                className="modern-input"
                                                name="categoryId"
                                                onChange={onInputChange}
                                                value={lift.categoryId}
                                            >
                                                <option value={1}>Saxlift</option>
                                                <option value={2}>Bomlift</option>
                                                <option value={3}>Pelarlift</option>
                                            </Form.Select>
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mt-2">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Beskrivning</p>
                                    <Form.Control
                                        className="modern-input"
                                        as="textarea"
                                        rows={3}
                                        onChange={onInputChange}
                                        name="description"
                                        placeholder="Beskrivning av liften"
                                        value={lift.description}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="bg-body border-secondary">
                    <Button variant="secondary" onClick={onHide} disabled={loading}>
                        Avbryt
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Sparar...
                            </>
                        ) : (
                            isEdit ? "Spara ändringar" : "Lägg till lift"
                        )}

                        {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}