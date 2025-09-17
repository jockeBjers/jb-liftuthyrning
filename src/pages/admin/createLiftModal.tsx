import { useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useRevalidator } from 'react-router-dom';

interface CreateLiftProps {
    show: boolean;
    onHide: () => void;
    onSuccess?: () => void;
}

export default function CreateLift({ show, onHide, onSuccess }: CreateLiftProps) {
    const [lift, setLift] = useState({
        name: '',
        brand: '',
        max_height: 0,
        max_weight: 0,
        platform_size: '',
        daily_price: 0,
        start_fee: 0,
        description: '',
        category_id: 1,
        fuel_id: 1
    });

    const [isLoading, setIsLoading] = useState(false);
    const revalidator = useRevalidator();


    // handle changes to all input elements in the form
    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string | number | null } =
            event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        // data conversion for number fields
        if (['max_height', 'max_weight', 'daily_price', 'start_fee', 'category_id', 'fuel_id'].includes(name)) {
            value = isNaN(+value) ? 0 : +value;
        }

        setLift({ ...lift, [name]: value });
    }

    async function sendForm(event: React.FormEvent) {

        event.preventDefault();
        setIsLoading(true);


        const payload: any = { ...lift };

        const response = await fetch('/api/lifts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            setLift({
                name: '',
                brand: '',
                max_height: 0,
                max_weight: 0,
                platform_size: '',
                daily_price: 0,
                start_fee: 0,
                description: '',
                category_id: 1,
                fuel_id: 1
            });
            onHide();

            revalidator.revalidate();

            if (onSuccess) onSuccess();
        }

    }


    return (
        <Modal show={show} onHide={onHide} size="lg" className="text-white">
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>Lägg till ny lift</Modal.Title>
            </Modal.Header>
            <Form onSubmit={sendForm}>
                <Modal.Body className="bg-secondary">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Namn</p>
                                    <Form.Control
                                        className="modern-input"
                                        onChange={setProperty}
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
                                        onChange={setProperty}
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
                                                onChange={setProperty}
                                                type="number"
                                                name="max_height"
                                                placeholder="10"
                                                value={lift.max_height || ''}
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
                                                onChange={setProperty}
                                                type="number"
                                                name="max_weight"
                                                placeholder="200"
                                                value={lift.max_weight || ''}
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
                                        onChange={setProperty}
                                        type="text"
                                        name="platform_size"
                                        placeholder="2x2m"
                                        value={lift.platform_size}
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
                                                onChange={setProperty}
                                                type="number"
                                                name="daily_price"
                                                placeholder="500"
                                                value={lift.daily_price || ''}
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
                                                onChange={setProperty}
                                                type="number"
                                                name="start_fee"
                                                placeholder="200"
                                                value={lift.start_fee || ''}
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
                                                name="fuel_id"
                                                onChange={setProperty}
                                                value={lift.fuel_id}
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
                                                name="category_id"
                                                onChange={setProperty}
                                                value={lift.category_id}
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
                                        onChange={setProperty}
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
                    <Button variant="secondary" onClick={onHide} disabled={isLoading}>
                        Avbryt
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Sparar...' : 'Skapa lift'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}