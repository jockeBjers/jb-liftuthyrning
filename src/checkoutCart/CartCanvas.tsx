import { Offcanvas, Button, ListGroup, Card, Form } from "react-bootstrap";
import { useCart } from "../context/CartProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { apiUtil } from "../utils/apiUtil";
import OrderConfirmationModal from "./OrderConfirmationModal";
import type User from "../interfaces/User";
import { useBooking } from "../hooks/useBooking";
export default function CartCanvas({ show, onHide }: { show: boolean; onHide: () => void }) {
  const { cartItems, startDate, endDate, clearCart, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { getFetch } = apiUtil();
  const hasItems = cartItems.length > 0;

  const { isBooking, bookingSuccess, calculateTotalCost, handleBooking, calculateItemCost } = useBooking();


  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const availableUsers = await getFetch("/api/users");
        setAllUsers(availableUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [user?.role]);



  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-secondary">
          <Offcanvas.Title>Kundvagn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          {user?.role === "admin" && hasItems && (
            <Form.Group className="mb-3">
              <Form.Label>Boka åt användare</Form.Label>
              <Form.Select
                value={selectedUserId || ""}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
              >
                <option value="">Välj användare...</option>
                {allUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName} ({u.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}


          {cartItems.length === 0 && <p className="text-white-50">Kundvagnen är tom.</p>}

          {hasItems && startDate && endDate && (
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

          {hasItems && (
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
        onConfirm={() => handleBooking(selectedUserId, onHide)}
        totalCost={calculateTotalCost()}
        isBooking={isBooking}
        bookingSuccess={bookingSuccess}
        cartItems={cartItems}
      />
    </>
  );
}