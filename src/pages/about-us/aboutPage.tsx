import { Container, Row, Col } from 'react-bootstrap';

export default function AboutPage() {
    return (
        <>
            <div className="about-page d-flex justify-content-center align-items-center">
                <Container className=" d-flex align-items-center justify-content-center">
                    <Row className="w-100 justify-content-center text-white-50">
                        <Col className='p-0'>
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

            <Container className="my-5">
                <h3 className="text-center text-white mb-4">Har ni frågor eller funderingar, <span className='text-primary'>kontakta någon av oss</span></h3>
                <Row className="justify-content-center">
                    {[
                        { name: "Karl Karlsson", phone: "070-123 45 67", mail: "Karl@jb-lift.se" },
                        { name: "Erik Svensson", phone: "070-234 56 78", mail: "erik@jb-lift.se" },
                        { name: "Lisa Karlsson", phone: "070-345 67 89", mail: "lisa@jb-lift.se" }
                    ].map((staff, idx) => (
                        <Col key={idx} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
                            <div className="card shadow-sm p-3 align-items-center" style={{ width: "16rem" }}>
                                <img
                                    src="/images/staff.png"
                                    alt={staff.name}
                                    className="rounded-circle mb-3"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center p-0">
                                    <h5 className="card-title mb-1">{staff.name}</h5>
                                    <div className="mb-1">{staff.phone}</div>
                                    <div className="text-muted">{staff.mail}</div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}