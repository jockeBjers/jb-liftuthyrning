import { Container, Row, Col } from 'react-bootstrap';

export default function AboutPage() {
    return (
        <>
            <div className="about-page d-flex justify-content-center align-items-center">
                <Container className="vh-100 d-flex align-items-center justify-content-center">
                    <Row className="w-100 justify-content-center text-white-50">
                        <Col >
                            <div className="page-container shadow-lg rounded-1 p-5 w-100">
                                <Row className="mt-3">
                                    <Col md="6">
                                        <h3 className="text-primary">Vår historia</h3>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore recusandae inventore sit laboriosam reiciendis, fugiat et itaque atque quod culpa voluptates quam facere consequuntur, quisquam veniam sequi, aspernatur possimus.</p>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore recusandae inventore sit laboriosam reiciendis, fugiat et itaque atque quod culpa voluptates quam facere consequuntur, quisquam veniam sequi, aspernatur possimus.</p>
                                    </Col>
                                    <Col md="6">
                                        <h3 className="text-primary">Vårt mål</h3>
                                        <p>Alltid biligast. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reiciendis delectus assumenda totam.</p>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium dolore recusandae inventore sit laboriosam reiciendis, fugiat et itaque atque quod culpa voluptates quam facere consequuntur, quisquam veniam sequi, aspernatur possimus.</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}