import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import DateRangePicker from "../../components/DateRangePicker";
import { useCart } from "../../context/CartProvider";
import ReturnButton from "../../components/ReturnButton";
import { calculateRentalCost } from "../../utils/calculateRentalCost";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import type Lift from "../../interfaces/Lift";
import { useAuth } from "../../context/AuthProvider";

export default function BookingPage() {
    const { liftDetails } = useLoaderData() as { liftDetails: any[] };
    const { startDate, endDate, setStartDate, setEndDate, addToCart, clearCartItems, removeFromCart } = useCart();
    const allLifts = liftDetails;
    const { user } = useAuth();

    const [availableLifts, setAvailableLifts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Filter available lifts when dates change
    useEffect(() => {
        if (!startDate || !endDate || allLifts.length === 0) {
            setAvailableLifts([]);
            return;
        }

        filterAvailableLifts();
    }, [startDate, endDate, allLifts]);



    const filterAvailableLifts = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));

        // try to fetch bookings and filter lifts based on date conflicts
        try {
            const bookings = await fetch("/api/liftBookings").then(res => res.json());

            const bookingsByLift: { [key: number]: any[] } = {};
            bookings.forEach((b: any) => {
                if (!bookingsByLift[b.liftId]) bookingsByLift[b.liftId] = [];
                bookingsByLift[b.liftId].push(b);
            });

            // keep only lifts that does not have date conflicts
            const available = allLifts.filter(lift => {
                const liftBookings = bookingsByLift[lift.id] || [];
                return !hasDateConflict(liftBookings, startDate, endDate);
            });

            setAvailableLifts(available);
        } catch (err) {
            console.error("Error filtering lifts:", err);
            setError("Kunde inte filtrera tillgängliga liftar");
        } finally {
            setLoading(false);
        }
    };

    const hasDateConflict = (bookings: any[], startDate: Date, endDate: Date) => {
        return bookings.some(b => {
            const existingStart = new Date(b.StartDate);
            const existingEnd = new Date(b.EndDate);

            const extendedStart = new Date(existingStart);
            extendedStart.setDate(extendedStart.getDate() - 1);

            return (
                (startDate >= extendedStart && startDate <= existingEnd) ||
                (endDate >= extendedStart && endDate <= existingEnd) ||
                (startDate <= extendedStart && endDate >= existingEnd)
            );
        });
    };


    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // If start date is after end date, update end date to match start date
        if (date && endDate && date > endDate) {
            setEndDate(date);
        }
    };

    const handleDateChange = () => {
        // Clear cart when dates change to prevent booking conflicts
        clearCartItems();
    };

    const calculateCostForLift = (lift: Lift): number => {
        if (!startDate || !endDate) return 0;
        return calculateRentalCost(startDate, endDate, lift.dailyPrice, lift.startFee);
    };

    const [addingLiftId, setAddingLiftId] = useState<number | null>(null);

    const handleToggleCart = async (lift: Lift) => {
        setAddingLiftId(lift.id);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (cartItems.some(item => item.id === lift.id)) {

            removeFromCart(lift.id);
        } else {

            addToCart(lift);
        }

        setAddingLiftId(null);
    };

    const cartItems = useCart().cartItems.map(item => item.lift);

    return (
        <Container fluid className="my-5 min-vh-100">
            <div className="m-2">
                <ReturnButton />
            </div>

            <Row className="justify-content-center">
                <Col md="6">
                    <div className="card-body bg-body text-white p-4">
                        <h1 className="text-primary display-4 mb-4">Bokning</h1>

                        <div className="border-bottom border-secondary pb-4 mb-4">
                            <h5 className="text-white mb-3">1. Välj datum för uthyrning</h5>

                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                handleStartDateChange={(date) => {
                                    handleStartDateChange(date);
                                    handleDateChange();
                                }}
                                setEndDate={(date) => {
                                    setEndDate(date);
                                    handleDateChange();
                                }}
                            />

                            {startDate && endDate && (
                                <div className="mt-3 p-3 bg-secondary rounded">
                                    <strong className="text-white-50">Vald period:</strong>
                                    <div className="text-white">
                                        {startDate.toLocaleDateString("sv-SE")} –{" "}
                                        {endDate.toLocaleDateString("sv-SE")}
                                    </div>
                                    <small className="text-white-50">
                                        (
                                        {Math.ceil(
                                            (endDate.getTime() - startDate.getTime()) /
                                            (1000 * 3600 * 24)
                                        ) + 1}{" "}
                                        dagar)
                                    </small>
                                </div>
                            )}
                        </div>

                        <div className="mb-5">
                            <h5 className="text-white mb-3">2. Tillgängliga liftar</h5>

                            {(!startDate || !endDate) && (
                                <p className="text-primary text-center">
                                    Välj datum för att se tillgängliga liftar.
                                </p>
                            )}


                            {loading && (
                                <div className="text-center py-4">
                                    <Spinner animation="border" variant="primary" />
                                    <div className="mt-2 text-white-50">
                                        Söker tillgängliga liftar...
                                    </div>
                                </div>
                            )}

                            {error && <p className="text-danger text-center">{error}</p>}

                            {!loading && !error && startDate && endDate && availableLifts.length === 0 && (
                                <p className="text-warning text-center">
                                    Inga liftar är tillgängliga för de valda datumen. Prova andra datum.
                                </p>
                            )}

                            {!loading && !error && availableLifts.length > 0 && (
                                <div className="table-responsive">
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Namn</th>
                                                <th className="d-none d-md-table-cell">Typ</th>
                                                <th className="d-none d-md-table-cell">Märke</th>
                                                <th className="d-none d-md-table-cell">Bränsle</th>
                                                <th className="d-none d-md-table-cell">Pris/dag</th>
                                                <th className="d-none d-md-table-cell">Startavgift</th>
                                                <th>Total kostnad</th>
                                                <th>Åtgärd</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {availableLifts.map((lift) => (
                                                <tr key={lift.id}>
                                                    <td className="fw-bold"> {lift.name}</td>
                                                    <td className="d-none d-md-table-cell">{lift.categoryName}</td>
                                                    <td className="d-none d-md-table-cell">{lift.brand}</td>
                                                    <td className="d-none d-md-table-cell">{lift.fuelName}</td>
                                                    <td className="d-none d-md-table-cell">{lift.dailyPrice} kr</td>
                                                    <td className="d-none d-md-table-cell">{lift.startFee} kr</td>
                                                    <td className="fw-bold text-primary">
                                                        {calculateCostForLift(lift)} kr
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant={
                                                                addingLiftId === lift.id
                                                                    ? "transparent"
                                                                    : cartItems.some(item => item.id === lift.id)
                                                                        ? "danger"
                                                                        : "success"
                                                            }
                                                            className="w-100 h-100 text-white p-0"
                                                            onClick={() => handleToggleCart(lift)}
                                                            disabled={!user}
                                                        >

                                                            {addingLiftId === lift.id ? (
                                                                <Spinner
                                                                    as="span"
                                                                    animation="border"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                cartItems.some(item => item.id === lift.id) ? (
                                                                    <i className="bi bi-dash-lg"></i>
                                                                ) : (
                                                                    <i className="bi bi-plus-lg"></i>
                                                                )
                                                            )}

                                                        </Button>

                                                    </td>




                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}

                            {availableLifts.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-primary text-center">
                                        Om du ändrar datumen töms din kundvagn automatiskt för att undvika bokningskonflikter.
                                        {!user && <p className="text-white"> Du måste vara inloggad för att boka</p>}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}