import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Footer() {
    return (
        <footer className="pb-0 pt-0 w-100">
            <div className=" text-secondary w-100 py-5 sticky-md-bottom">
                <Container>
                    <Row className="align-items-start">
                        <Col xs="12" md="6" className="mb-4 mb-md-0">
                            <h4 className="text-primary mb-3">JB-Liftuthyrning</h4>
                            <p>
                                Värsta bästa liftarna.<br />
                                Kontakta oss för mer information!
                            </p>
                        </Col>
                        <Col xs="12" md="6" >
                            <div >
                                <h4 className="text-primary mb-3">Öppettider:</h4>
                                Mån–Fre: 07:00–17:00<br />
                                Lör–Sön: Stängt
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bg-body text-white w-100 pt-4 pb-0 sticky-md-bottom">
                <Container>
                    <Row className="align-items-start">
                        <Col xs="12" md="6" className="mb-4 mb-md-0 px-2">
                            <p className="m-3 text-start text-white-50">
                                <strong className="text-primary">Adress:</strong> Johannisborgs slottsruin, Norrköping<br />
                                <strong className="text-primary">Telefon:</strong> 011 - 00 11 22<br />
                                <strong className="text-primary">Email:</strong> info@example.com
                            </p>
                        </Col>
                        <Col xs="12" md="6" className="d-flex justify-content-center m-0 p-0 mb-0 mb-md-3">
                            <div className="w-100" style={{ width: "100%", padding: 0, margin: 0 }}>
                                <iframe
                                    className="p-0 grayscale"
                                    style={{ display: "block", border: 0, margin: 0 }}
                                    title="Johannisborgs slottsruin"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1558.8263408829487!2d16.1991038017122!3d58.59999650511588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46593a45f19ea329%3A0xeed46e94fe2f5fea!2sJohannisborgs%20slottsruin!5e1!3m2!1ssv!2sse!4v1757666268138!5m2!1ssv!2sse"
                                    width="100%"
                                    height="240"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
            <div className="bg-secondary text-light text-center py-2 ">
                <small>© {new Date().getFullYear()} JB-Liftuthyrning </small>
            </div>
        </footer>
    );
}