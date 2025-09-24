import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type Lift from "../../interfaces/Lift";

export default function ProductCard({ lift }: { lift: Lift }) {
    const navigate = useNavigate();

    let fuelType = "Diesel";

    if (lift.fuelId === 1) {
        fuelType = "EL";
    }

    let category = "Saxlift";
    if (lift.categoryId === 2) {
        category = "Bomlift";
    } else if (lift.categoryId === 3) {
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
        

            <Card.Body className="p-0 d-flex flex-column">
                <div className="mb-3 p-0">
                    <Card.Title className="text-secondary display-5 p-2 bg-primary">
                        <b>{lift.name}</b>
                    </Card.Title>
                    <div className="text-white-50 mb-2">{category}</div>
                    <Card.Text className="desc-div">{lift.description}</Card.Text>
                </div>
                <div className="bg-secondary text-white p-3 rounded-0 lh-1">
                    <Card.Text><strong>Märke:</strong> {lift.brand} </Card.Text>
                    <Card.Text><strong>Bränsletyp:</strong> {fuelType} </Card.Text>
                    <Card.Text><strong>Max höjd:</strong> {lift.maxHeight} m</Card.Text>
                    <Card.Text><strong>Max vikt:</strong> {lift.maxWeight} kg</Card.Text>
                    <Card.Text><strong>Korgstorlek:</strong> {lift.platformSize}</Card.Text>
                </div>
                <div className="bg-body text-white-50 p-3 rounded-0 mb-3 lh-1">
                    <Card.Text><strong>Pris per dag:</strong> {lift.dailyPrice} kr</Card.Text>
                    <Card.Text><strong>Startavgift:</strong> {lift.startFee} kr</Card.Text>
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
