import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ lift }: { lift: any }) {
    const navigate = useNavigate();

    return (
        <div className="w-100 h-100 position-relative border-0 card card-hover-effect">
            <Card.Body className="p-0 d-flex flex-column">
                <div className="mb-3 p-0">
                    <Card.Title className="text-secondary display-5 p-2 bg-primary">
                        <b>{lift.name}</b>
                    </Card.Title>
                    <div className="text-white-50 mb-2">{lift.categoryName}</div>
                    <Card.Text className="desc-div">{lift.description}</Card.Text>
                </div>
                <div className="bg-secondary text-white p-3 rounded-0 lh-1">
                    <Card.Text><strong>Märke:</strong> {lift.brand}</Card.Text>
                    <Card.Text><strong>Bränsletyp:</strong> {lift.fuelName}</Card.Text>
                    <Card.Text><strong>Max höjd:</strong> {lift.maxHeight} m</Card.Text>
                    <Card.Text><strong>Max vikt:</strong> {lift.maxWeight} kg</Card.Text>
                    <Card.Text><strong>Korgstorlek:</strong> {lift.platformSize}</Card.Text>
                </div>
                <div className="bg-body text-white-50 p-3 rounded-0 mb-3 lh-1">
                    <Card.Text><strong>Pris per dag:</strong> {lift.dailyPrice} kr</Card.Text>
                    <Card.Text><strong>Startavgift:</strong> {lift.startFee} kr</Card.Text>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-primary px-3 flex-fill"
                            onClick={() => navigate(`/products/${lift.id}`)}
                        >
                            Läs mer
                        </button>
                        <button
                            className="btn btn-primary px-3 flex-fill"
                            onClick={() => navigate(`/booking`)}
                        >
                            Boka
                        </button>
                    </div>
                </div>
            </Card.Body>
        </div>
    );
}
