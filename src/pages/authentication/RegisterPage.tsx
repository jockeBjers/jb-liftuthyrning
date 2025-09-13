import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="login-page">
                <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center  p-0">
                    <Row className="w-100 justify-content-center">
                        <Col md="10" lg="8">
                            <div className="page-container shadow-lg rounded-1 p-5 w-100">
                                <div className="text-center mb-4">
                                    <h2 className="login-title text-primary fw-bold mb-2">Välkommen</h2>
                                    <p className="login-subtitle text-white-50 mb-0">Registrera nytt konto</p>
                                </div>
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Förnamn"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Efternamn"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="email"
                                                    placeholder="E-post"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="Telefonnummer"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Lösenord"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-4">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Bekräfta lösenord"
                                                    className="modern-input fs-5 py-3"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="6">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="btn btn-primary border-0 shadow w-100 mb-3 fw-semibold rounded-pill py-3 text-secondary"
                                            >
                                                Registrera
                                            </Button>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="lg"
                                                className="btn btn-secondary border-0 shadow w-100 mb-3 fw-semibold rounded-pill py-3"
                                                onClick={() => navigate('/')}
                                            >
                                                Avbryt
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}