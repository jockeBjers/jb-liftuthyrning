import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type Lift from "../../interfaces/Lift";

export default function ProductCard({ lift }: { lift: Lift }) {
    const navigate = useNavigate();
    return (
        <Card className="w-100 shadow-sm h-100">
            <Card.Img
                variant="top"
                src={`/images/products/${lift.id}.jpg`}
                alt={lift.name}
                style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="p-3">
                <Card.Title as="h5"><b>{lift.name}</b></Card.Title>
                <Card.Text>{lift.description}</Card.Text>
                <Card.Text>
                    <strong>Pris per timme:</strong> {lift.hourly_price} kr
                </Card.Text>
                <Card.Text>
                    <strong>Pris per dag:</strong> {lift.daily_price} kr
                </Card.Text>
                <Card.Text>
                    <strong>Startavgift:</strong> {lift.start_fee} kr
                </Card.Text>
                <Card.Text>
                    <strong>Max höjd:</strong> {lift.max_height} m
                </Card.Text>
                <Card.Text>
                    <strong>Max vikt:</strong> {lift.max_weight} kg
                </Card.Text>
                <Card.Text>
                    <strong>Korgstorlek:</strong> {lift.platform_size}
                </Card.Text>
            </Card.Body>

            <div className="d-flex gap-2 justify-content-end align-items-center mb-3 mt-auto px-3">
                <span className="badge bg-primary text-black px-4">Diesel</span>
                <button
                    className="btn btn-primary text-center px-4"
                    onClick={() => navigate(`/products/${lift.id}`)}
                >
                    Boka!
                </button>
            </div>
        </Card>
    )
}