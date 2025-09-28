import { Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap';

interface CreateUserModalProps {
    show: boolean;
    onHide: () => void;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        role: string;
        password?: string;
    };
    onInputChange: (event: React.ChangeEvent) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    errorMessage: string | null;
    isEdit?: boolean;

}

export default function CreateUserModal({
    show,
    onHide,
    user,
    onInputChange,
    onSubmit,
    loading,
    errorMessage,
    isEdit = false
}: CreateUserModalProps) {
    return (
        <Modal show={show} onHide={onHide} size="lg" className="text-white">
            <Modal.Header closeButton className="bg-body border-secondary">
                <Modal.Title className='text-primary'>
                    {isEdit ? "Redigera Användare" : "Lägg till ny användare"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className="bg-body border-secondary">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Förnamn</p>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={onInputChange}
                                        placeholder="Förnamn"
                                        className="modern-input"
                                        autoComplete='off'
                                        maxLength={50}
                                        minLength={2}
                                        required
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Efternamn</p>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={onInputChange}
                                        placeholder="Efternamn"
                                        className="modern-input"
                                        autoComplete='off'
                                        maxLength={50}

                                        minLength={2}
                                        required
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">E-post</p>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={onInputChange}
                                        placeholder="E-post"
                                        className="modern-input"
                                        inputMode='email'
                                        autoComplete='off'
                                        maxLength={50}
                                        minLength={5}
                                        required
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Telefonnummer</p>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={user.phone}
                                        onChange={onInputChange}
                                        placeholder="Telefonnummer"
                                        className="modern-input"
                                        autoComplete='off'
                                        maxLength={15}
                                        minLength={5}
                                        inputMode='tel'
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Roll</p>
                                    <Form.Select
                                        name="role"
                                        value="user"
                                        disabled
                                        className="modern-input"
                                    >
                                        <option value="user">Användare (sätt roll i databasen)</option>
                                    </Form.Select>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label className="d-block text-white">
                                    <p className="mb-1">Lösenord {isEdit ? "(lämna tomt för att behålla nuvarande)" : ""}</p>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={(user as any).password || ""}
                                        onChange={onInputChange}
                                        placeholder="Lösenord"
                                        className="modern-input"
                                        autoComplete='off'
                                        maxLength={100}
                                        minLength={isEdit ? 0 : 6}
                                        required={!isEdit}
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
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Sparar...
                            </>
                        ) : (
                            isEdit ? "Spara ändringar" : "Skapa användare"
                        )}

                        {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}


                    </Button>


                </Modal.Footer>
            </Form>
        </Modal>
    );
}