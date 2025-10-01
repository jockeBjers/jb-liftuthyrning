
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../../components/ReturnButton";
import SpecificationRow from "./SpecificationRow";
import PriceRow from "./PriceRow";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ProductDetailsPage() {
    const liftDetails = useLoaderData() as any;
    const lift = liftDetails;
    const navigate = useNavigate();

    if (!liftDetails) return <div>Loading...</div>;

    const handleBookingClick = () => {
        navigate('/booking');
    };

    return (
        <Container className="my-5">
            <div className="m-2">
                <ReturnButton />
            </div>
            <Row className="justify-content-center">
                <Col lg="8">
                    <div>
                        <div className="product-header">
                            <h1 className="text-secondary display-1 p-2">
                                {lift.name}
                            </h1>
                        </div>
                        <div className="card-body bg-body text-white p-4 ">
                            <p className="text-white-50 mt-3 mb-2 pb-2 border-bottom border-secondary">{lift.description}</p>
                            <div className=" pb-2 mb-2 border-bottom border-secondary">
                                <h5 className="text-white mb-3 ">Tekniska specifikationer</h5>
                                <Row className="g-3">
                                    <SpecificationRow label="Typ" value={lift.categoryName} />
                                    <SpecificationRow label="Märke" value={lift.brand} />
                                    <SpecificationRow label="Bränsletyp" value={liftDetails.fuelName} />
                                    <SpecificationRow label="Max höjd" value={lift.maxHeight} unit="m" />
                                    <SpecificationRow label="Max vikt" value={lift.maxWeight} unit="kg" />
                                    <SpecificationRow label="Korgstorlek" value={lift.platformSize} />
                                </Row>
                            </div>
                            <div className="border-bottom border-secondary pb-2 mb-3">
                                <h5 className="text-white mb-3">Prislista</h5>
                                <Row className="g-3">
                                    <PriceRow label="Per dag" value={lift.dailyPrice} />
                                    <PriceRow label="Startavgift" value={lift.startFee} />
                                </Row>
                            </div>
                            <div>
                                <h5 className="text-white mb-3">Boka denna lift</h5>
                                <p className="text-white-50 mb-3">
                                    Gå till bokningssidan för att välja datum och se tillgänglighet för alla liftar.
                                </p>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100 fw-bold mb-5"
                                    onClick={handleBookingClick}
                                >
                                    Gå till bokning
                                </Button>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique corrupti natus deserunt mollitia doloremque harum neque omnis obcaecati hic ratione, voluptatibus debitis nihil, quam consectetur sapiente? Blanditiis, dicta autem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
