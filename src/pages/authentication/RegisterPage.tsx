import { Container, Row, Col, Form, Button, Spinner, Toast } from 'react-bootstrap';
import ReturnButton from '../../components/ReturnButton';
import { useFetchApi } from '../../hooks/useFetchApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { postFetch } = useFetchApi();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    function setProperty(event: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;
        if (name === 'phone') {
            value = value.replace(/[^0-9+\-\s]/g, '');
        }
        setUser({ ...user, [name]: value });
    }

    async function sendForm(event: React.FormEvent) {
        event.preventDefault();
        const message = 'Något gick fel';
        const timeOut = 2000;
        setErrorMessage('');
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const success = await postFetch("/api/users", user);
            if (success) {
                navigate('/login');
            } else {
                setErrorMessage(message);
                setTimeout(() => setErrorMessage(''), timeOut);
            }
        } catch (err: any) {
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(''), timeOut);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="login-page min-vh-100 d-flex align-items-center justify-content-center">

            <Container fluid className="p-0">
                <Row className="g-0 min-vh-100">
                    <Col md="12" lg="6" className="d-flex align-items-stretch justify-content-center">
                        <div className="page-container shadow-lg rounded-1 p-5 w-100 d-flex flex-column justify-content-center" style={{ minHeight: '100vh' }}>
                            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                                <ReturnButton />
                            </div>
                            <div className="text-center mb-4">
                                <h2 className="login-title text-primary fw-bold mb-2">Välkommen</h2>
                                <p className="login-subtitle text-white-50 mb-0">Registrera nytt konto</p>
                            </div>
                            <Form onSubmit={sendForm}>
                                <Row>
                                    <Col md="6">
                                        <div className="mb-4">
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={setProperty}
                                                placeholder="Förnamn"
                                                className="modern-input fs-5 py-3"
                                                autoComplete='off'
                                                maxLength={50}
                                                minLength={2}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-4">
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={setProperty}
                                                placeholder="Efternamn"
                                                className="modern-input fs-5 py-3"
                                                autoComplete='off'
                                                maxLength={50}
                                                minLength={2}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-4">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={setProperty}
                                                placeholder="E-post"
                                                className="modern-input fs-5 py-3"
                                                inputMode='email'
                                                autoComplete='off'
                                                maxLength={50}
                                                minLength={5}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-4">
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={user.phone}
                                                onChange={setProperty}
                                                placeholder="Telefonnummer"
                                                className="modern-input fs-5 py-3"
                                                autoComplete='off'
                                                maxLength={14}
                                                minLength={4}
                                                inputMode='tel'
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-4">
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={user.password}
                                                onChange={setProperty}
                                                placeholder="Lösenord"
                                                className="modern-input fs-5 py-3"
                                                minLength={8}
                                                maxLength={20}
                                                autoComplete='off'
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        {errorMessage && (
                                            <div className="text-danger fw-semibold fs-5 py-3 text-center">{errorMessage}</div>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Button
                                            type="submit"
                                            variant={errorMessage ? 'danger' : 'primary'}
                                            size="lg"
                                            className={`btn border-0 shadow w-100 mb-3 fw-semibold rounded-pill py-3 text-white`}
                                            disabled={loading}
                                        >
                                            {loading && <Spinner animation="border" size="sm" className="me-2" />}
                                            {errorMessage ? 'Misslyckades' : 'Registrera'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col md="6" className="d-none d-md-block"></Col>
                </Row>
            </Container>
        </div >
    );
}