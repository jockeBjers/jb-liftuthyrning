import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type Lift from "../../interfaces/Lift";

export default function ProductCard({ lift }: { lift: Lift }) {
    const navigate = useNavigate();

    let fuelType = "Diesel";
    let badgeClass = "bg-warning text-dark";

    if (lift.fuel_id === 1) {
        fuelType = "EL";
        badgeClass = "bg-success text-white";
    }

    let category = "Saxlift";
    if (lift.category_id === 2) {
        category = "Bomlift";
    } else if (lift.category_id === 3) {
        category = "Pelarlift";
    }

    return (
        <div
            role="button"
            tabIndex={0}
            className="w-100 h-100 position-relative border-0 card card-hover-effect"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${lift.id}`)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/products/${lift.id}`); }}
        >
            <Card.Img
                variant="top"
                src={`/images/products/${lift.id}.jpg`}
                alt={lift.name}
                style={{ objectFit: "cover", height: "200px" }}
            />
            <span
                className={`badge ${badgeClass} px-4 rounded-0 position-absolute`}
                style={{ top: "0px", left: "0px", zIndex: 2 }}
            >
                {fuelType}
            </span>

            <Card.Body className="p-0 d-flex flex-column">
                <div className="mb-3 p-3">
                    <Card.Title as="h5" className="text-primary mb-1">
                        <b>{lift.name}</b>
                    </Card.Title>
                    <div className="text-white-50 mb-2">{category}</div>
                    <Card.Text>{lift.description}</Card.Text>
                </div>
                <div className="bg-secondary text-white p-3 rounded-0 lh-1">
                    <Card.Text><strong>Märke:</strong> {lift.brand} </Card.Text>
                    <Card.Text><strong>Max höjd:</strong> {lift.max_height} m</Card.Text>
                    <Card.Text><strong>Max vikt:</strong> {lift.max_weight} kg</Card.Text>
                    <Card.Text><strong>Korgstorlek:</strong> {lift.platform_size}</Card.Text>
                </div>
                <div className="bg-body text-white-50 p-3 rounded-0 mb-3 lh-1">
                    <Card.Text><strong>Pris per dag:</strong> {lift.daily_price} kr</Card.Text>
                    <Card.Text><strong>Startavgift:</strong> {lift.start_fee} kr</Card.Text>
                    <button
                        className="btn btn-primary px-4"
                        onClick={() => navigate(`/products/${lift.id}`)}
                    >
                        Boka!
                    </button>
                </div>
            </Card.Body>
        </div>
    );
}
