import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="login-page">
                <Container className="vh-100 d-flex align-items-center justify-content-center">
                    <Row className="w-100 justify-content-center">
                        <Col md="8" lg="6">
                            <div className="page-container shadow-lg rounded-1 p-5 w-100">
                                <div className="text-center mb-4">
                                    <h2 className="login-title text-primary fw-bold mb-2">Välkommen</h2>
                                    <p className="login-subtitle text-white-50 mb-0">Logga in på ditt konto</p>
                                </div>
                                
                                <Form>
                                    <div className="mb-4">
                                        <Form.Control
                                            type="email"
                                            placeholder="E-post"
                                            className="modern-input fs-5 py-3"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <Form.Control
                                            type="password"
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
                                    >
                                        Logga in
                                    </Button>
                                    
                                    <div className="text-center">
                                        <span className="text-white-50">Har du inget konto? </span>
                                        <a href="#" className="text-decoration-none "   onClick={() => navigate(`/register/`)}>
                                            Registrera dig
                                        </a>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}