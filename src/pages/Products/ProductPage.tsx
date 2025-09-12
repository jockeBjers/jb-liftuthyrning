import { Col, Row } from "react-bootstrap";
import useLifts from "../../hooks/useLifts";
import ProductCard from "./ProductCard";
import type Lift from "../../interfaces/lifts";

export default function StartPage() {
    const { lifts } = useLifts();

    return (
        <>
            <h2>Vårat utbud</h2>

            <div className="container">
                <Row>
                    {lifts && lifts.length > 0 ? (
                        lifts.map((product: Lift) => (
                            <Col
                                key={product.id}
                                xs={12}
                                md={6}
                                lg={4}
                                className="mb-4 d-flex align-items-stretch"
                            >
                                <ProductCard lift={product} />
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <div className="alert alert-warning">No products found.</div>
                        </Col>
                    )}
                </Row>
            </div>
        </>
    );
}