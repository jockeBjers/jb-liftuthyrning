import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReturnButton from "../../components/ReturnButton";
import { useAuth } from "../../context/AuthProvider";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function setProperty(event: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault();

        const success = await loginUser(user.email, user.password);

        if (success) {
            navigate('/profile');
        }
    }
    return (
        <div className="login-page min-vh-100 d-flex align-items-center justify-content-center">
            <Container fluid className="p-0">
                <Row className="g-0 min-vh-100">
                    <Col md="12" lg="4" className="d-flex align-items-stretch justify-content-center">
                        <div className="page-container shadow-lg rounded-1 p-5 w-100 d-flex flex-column justify-content-center" style={{ minHeight: '100vh' }}>
                            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                                <ReturnButton />
                            </div>
                            <div className="text-center mb-4">
                                <h2 className="login-title text-primary fw-bold mb-2">Välkommen</h2>
                                <p className="login-subtitle text-white-50 mb-0">Logga in på ditt konto</p>
                            </div>
                            <Form>
                                <div className="mb-4">
                                    <Form.Control
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={setProperty}
                                                placeholder="E-post"
                                                className="modern-input fs-5 py-3"
                                                required
                                            />
                                </div>
                                <div className="mb-4">
                                    <Form.Control
                                                type="password"
                                                name="password"
                                                value={user.password}
                                                onChange={setProperty}
                                                placeholder="Lösenord"
                                                className="modern-input fs-5 py-3"
                                                required
                                            />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="btn btn-primary border-0 shadow w-100 mb-3 fw-semibold rounded-pill py-3"
                                    onClick={handleSubmit}
                                >
                                    Logga in
                                </Button>
                                <div className="text-center">
                                    <span className="text-white-50">Har du inget konto? </span>
                                    <button
                                        type="button"
                                        className="btn btn-link text-decoration-none p-0 align-baseline"
                                        onClick={() => navigate('/register')}

                                    >
                                        Registrera dig
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col md="6" className="d-none d-md-block"></Col>
                </Row>
            </Container>
        </div>
    );
}