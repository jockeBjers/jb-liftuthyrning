import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButton from "../../components/ReturnButton";
import { useAuth } from "../../context/AuthProvider";
import { useSubmitForm } from "../../hooks/useSubmitForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginUser, user } = useAuth();

    const [userForm, setUser] = useState({
        email: '',
        password: ''
    });

    function setProperty(event: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;
        setUser({ ...userForm, [name]: value });
    }

    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/profile');
        }
    }, [user, navigate]);


    const { sendForm, loading, errorMessage } = useSubmitForm(
        () => loginUser(userForm.email, userForm.password)
    );

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
                            <Form onSubmit={e => sendForm(e, navigate, 'Fel e-post eller lösenord')}>
                                <div className="mb-4">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={userForm.email}
                                        onChange={setProperty}
                                        placeholder="E-post"
                                        className="modern-input fs-5 py-3"
                                        maxLength={50}
                                        inputMode='email'
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={userForm.password}
                                        onChange={setProperty}
                                        placeholder="Lösenord"
                                        className="modern-input fs-5 py-3"
                                        autoComplete="off"
                                        minLength={4}
                                        maxLength={40}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant={errorMessage ? 'danger' : 'primary'}
                                    size="lg"
                                    className={`btn border-0 shadow w-100 mb-3 fw-semibold rounded-pill py-3 text-white`}
                                    disabled={loading}
                                >
                                    {loading && <Spinner animation="border" size="sm" className="me-2" />}
                                    {errorMessage ? 'Misslyckades' : 'Logga in'}
                                </Button>
                                <div className="text-danger text-center mb-2">{errorMessage}</div>
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