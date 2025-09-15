import { useParams } from "react-router-dom";
import useLifts from "../../../hooks/useLifts";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReturnButton from "../../../components/ReturnButton";
import SpecificationRow from "./SpecificationRow";
import PriceRow from "./PriceRow";
import DateRangePicker from "./DateRangePicker";
import { Container, Row, Col } from "react-bootstrap";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { lift } = useLifts(id ? Number(id) : undefined);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (!lift) return <div>Loading...</div>;

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // If start date is after end date, update end date to match start date
        if (date && endDate && date > endDate) {
            setEndDate(date);
        }
    };

    let fuelType = "Diesel";
    if (lift.fuel_id === 1) fuelType = "Eldriven";

    let category = "Saxlift";
    if (lift.category_id === 2) category = "Bomlift";
    else if (lift.category_id === 3) category = "Pelarlift";

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
                                    <SpecificationRow label="Typ" value={category} />
                                    <SpecificationRow label="Märke" value={lift.brand} />
                                    <SpecificationRow label="Bränsletyp" value={fuelType} />
                                    <SpecificationRow label="Max höjd" value={lift.max_height} unit="m" />
                                    <SpecificationRow label="Max vikt" value={lift.max_weight} unit="kg" />
                                    <SpecificationRow label="Korgstorlek" value={lift.platform_size} />
                                </Row>
                            </div>
                            <div className="border-bottom border-secondary pb-2 mb-3">
                                <h5 className="text-white mb-3">Prislista</h5>
                                <Row className="g-3">
                                    <PriceRow label="Per dag" value={lift.daily_price} />
                                    <PriceRow label="Startavgift" value={lift.start_fee} />
                                </Row>
                            </div>
                            <div>
                                <h5 className="text-white mb-3">Boka lift</h5>

                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    handleStartDateChange={handleStartDateChange}
                                    setEndDate={setEndDate} />

                                <div className="bg-dark p-3 rounded mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-white-50">Total kostnad:</span>
                                        <span className="text-primary fw-bold fs-5">
                                            4200 kr
                                        </span>
                                    </div>
                                    <small className="text-white-50">
                                        (Inkl. startavgift: {lift.start_fee} kr)
                                    </small>
                                </div>

                                <button className="btn btn-primary btn-lg w-100 fw-bold mb-5" >
                                    Skicka bokningsförfrågan
                                </button>
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