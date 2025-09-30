import { Offcanvas, Button, ListGroup, Card } from "react-bootstrap";
import { useCart } from "../context/CartProvider";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useFetchApi } from "../hooks/useFetchApi";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { calculateRentalCost } from "../utils/calculateRentalCost";
export default function CartCanvas({ show, onHide }: { show: boolean; onHide: () => void }) {
  const { cartItems, startDate, endDate, clearCart, removeFromCart } = useCart();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { postFetch } = useFetchApi();

  function calculateItemCost(item: { lift: { dailyPrice: number; startFee: number } }): number {
    if (!startDate || !endDate) return 0;
    return calculateRentalCost(startDate, endDate, item.lift.dailyPrice, item.lift.startFee);
  }

  const calculateTotalCost = (): number => {
    return cartItems.reduce((sum, item) => {
      return sum + calculateItemCost(item);
    }, 0);
  };

  const handleBooking = async () => {
    if (!user) {
      return;
    }

    setIsBooking(true);
    try {

      const totalPrice = calculateTotalCost();

      const formatLocalDate = (date: Date) =>
        new Intl.DateTimeFormat('sv-SE').format(date);

      const order = await postFetch("/api/orders", {
        userId: user.id,
        orderDate: formatLocalDate(startDate!),
        returnDate: formatLocalDate(endDate!),
        totalPrice
      });

      const orderItemPromises = cartItems.map(item =>
        postFetch("/api/orderItems", {
          orderId: order.insertId,
          liftId: item.lift.id,
          dailyPrice: item.lift.dailyPrice,
          startFee: item.lift.startFee
        })
      );

      const minSpinnerTime = new Promise(resolve => setTimeout(resolve, 500));
      await Promise.all([...orderItemPromises, minSpinnerTime]);

      setBookingSuccess(true);

      setTimeout(() => {
        setBookingSuccess(false);
        setShowModal(false);
        clearCart();
        onHide();
      }, 3000);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Ett fel uppstod vid checkout.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-secondary">
          <Offcanvas.Title>Kundvagn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 && <p className="text-white-50">Kundvagnen är tom.</p>}

          {cartItems.length > 0 && startDate && endDate && (
            <div className="mb-3 p-2 bg-transparent ">
              <strong className="text-white-50">Bokningsperiod:</strong>
              <div className="text-white">
                {startDate.toLocaleDateString('sv-SE')} – {endDate.toLocaleDateString('sv-SE')}
              </div>
              <small className="text-white-50">
                ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1} dagar)
              </small>
            </div>
          )}

          <ListGroup>
            {cartItems.map(item => {
              return (
                <Card
                  key={item.lift.id}
                  className={"mb-3 border-0 bg-transparent shadow-none border-bottom rounded-0 py-2"}

                >
                  <Card.Body className="d-flex justify-content-between align-items-start p-2">
                    <div>
                      <Card.Title className={`mb-1 fw-bold text-primary`}>
                        {item.lift.name}

                      </Card.Title>
                      <Card.Text className="mb-0 text-white">
                        {item.lift.dailyPrice} kr / dag + startavgift {item.lift.startFee} kr
                      </Card.Text>
                      <Card.Text className="fw-bold mt-1 text-white">
                        Totalt: <span className="text-white-50"> {calculateItemCost(item)} kr</span>
                      </Card.Text>

                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.lift.id)}
                      className="bg-transparent border-1 text-danger"
                    >
                      X
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </ListGroup>

          {cartItems.length > 0 && (
            <>
              <div className="mt-3 fw-bold">
                Totalt: {calculateTotalCost()} kr
              </div>
              <Button
                className="mt-3 w-100"
                variant="primary"
                onClick={() => setShowModal(true)}
              >
                Slutför bokning
              </Button>
              <Button className="mt-2 w-100" variant="secondary" onClick={clearCart}>
                Töm kundvagn
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <OrderConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleBooking}
        totalCost={calculateTotalCost()}
        isBooking={isBooking}
        bookingSuccess={bookingSuccess}
        cartItems={cartItems}
      />
    </>
  );
}