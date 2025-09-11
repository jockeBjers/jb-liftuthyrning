import { Card } from "react-bootstrap";

type Product = {
    id: number;
    name: string;
    description: string;
};
export default function ProductCard({ product }: { product: Product }) {

    return (
        <Card className="w-100 shadow-sm h-100">
            <Card.Img
                variant="top"
                src={`/images/products/${product.id}.jpg`}
                alt={product.name}
                style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="p-3">
                <Card.Title as="h5"><b>{product.name}</b></Card.Title>
                <Card.Text>{product.description}</Card.Text>
            </Card.Body>

            <div className="d-flex justify-content-end mb-3 mt-auto px-3">
                <a href="#" className="btn btn-primary text-center px-5">Boka!</a>
            </div>
        </Card>
    )


}