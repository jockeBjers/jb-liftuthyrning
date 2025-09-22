import type Lift from "../../../interfaces/Lift";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReturnButton from "../../../components/ReturnButton";
import SpecificationRow from "./SpecificationRow";
import PriceRow from "./PriceRow";
import DateRangePicker from "../../../components/DateRangePicker";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useCart } from "../../../context/CartProvider";

export default function ProductDetailsPage() {
    const [isBooking, setIsBooking] = useState(false);
    const lift = useLoaderData() as Lift;
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const { startDate, endDate, setStartDate, setEndDate, addToCart } = useCart();

    if (!lift) return <div>Loading...</div>;

    const calculateTotalCost = () => {
        if (!startDate || !endDate) return 0;
        const fromDate = new Date(startDate).getTime();
        const toDate = new Date(endDate).getTime();
        const daysOfRental = Math.ceil(
            (toDate - fromDate) / (1000 * 3600 * 24)
        ) + 1;
        return (daysOfRental * lift.dailyPrice) + lift.startFee;
    };


    const sendToCart = async () => {
        if (!startDate || !endDate) return;
        setIsBooking(true);
        try {
            addToCart(lift);
            await new Promise(resolve => setTimeout(resolve, 500));
            setBookingSuccess(true);
        } catch (error) {
            console.error("Error adding to cart:", error);
            setBookingSuccess(false);
        } finally {
            setIsBooking(false);
            setTimeout(() => setBookingSuccess(false), 3000);
        }
    };

    let fuelType = "Diesel";
    if (lift.fuelId === 1) fuelType = "Eldriven";

    let category = "Saxlift";
    if (lift.categoryId === 2) category = "Bomlift";
    else if (lift.categoryId === 3) category = "Pelarlift";

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
                                <h5 className="text-white mb-3">Boka lift</h5>

                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    handleStartDateChange={setStartDate}
                                    setEndDate={setEndDate}
                                />


                                <div className="bg-dark p-3 rounded mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-white-50">Total kostnad:</span>
                                        <span className="text-primary fw-bold fs-5">
                                            {calculateTotalCost()} kr
                                        </span>
                                    </div>
                                    <small className="text-white-50">
                                        (Inkl. startavgift: {lift.startFee} kr)
                                    </small>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg w-100 fw-bold mb-5"
                                    onClick={() => {
                                        sendToCart();
                                    }}
                                    disabled={!startDate || !endDate}
                                >
                                    {isBooking && !bookingSuccess && (
                                        <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                                    )}
                                    {bookingSuccess ? "Bokning tillagd!" : "Lägg i kundvagn"}
                                </button>

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
