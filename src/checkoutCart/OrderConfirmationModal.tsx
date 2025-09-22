import { Modal, Button, ListGroup, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartProvider";

interface Props {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cartItems: { lift: { id: number; name: string; dailyPrice: number; startFee: number } }[];
    totalCost: number;
    isBooking: boolean;
    bookingSuccess: boolean;
}

export default function OrderConfirmationModal({
    show,
    onClose,
    onConfirm,
    cartItems,
    totalCost,
    isBooking,
    bookingSuccess
}: Props) {
    const { startDate, endDate } = useCart();

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className={bookingSuccess ? "bg-success" : "bg-body"}>
                <Modal.Title className={bookingSuccess ? "text-white" : "text-primary"}>
                    Bekräfta bokning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush" className="mb-3">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.lift.id}>
                            <div className="text-primary">
                                {item.lift.name}
                            </div>

                            <div className="text-white-50">
                                {item.lift.dailyPrice} kr / dag + startavgift {item.lift.startFee} kr
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <div className="mt-2 text-white">
                    {startDate?.toLocaleDateString()} – {endDate?.toLocaleDateString()}
                </div>
                <div className="mt-3"><span className="text-primary fw-bold">Totalt:</span> {totalCost} kr</div>

                {bookingSuccess && <div className="text-success my-3 text-center">Du hittar din bokning på din profil!</div>}
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Avbryt
                    </Button>
                    <Button
                        variant={bookingSuccess ? "success" : "primary"}
                        onClick={onConfirm}
                        disabled={isBooking || bookingSuccess}
                    >
                        {isBooking && !bookingSuccess && (
                            <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                        )}
                        {bookingSuccess ? "Bokning skickad!" : "Bekräfta"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
