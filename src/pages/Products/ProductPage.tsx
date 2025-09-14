import { Col, Container, Row } from "react-bootstrap";
import useLifts from "../../hooks/useLifts";
import ProductCard from "./ProductCard";
import type Lift from "../../interfaces/Lift";

export default function StartPage() {
    const { lifts } = useLifts();

    return (
        <>
            <Container>
                <div className="products-page my-5 text-center">
                </div>
                <div className="my-4 position-relative" >
                    <div className="position-absolute bottom-0 start-0 w-100 bg-body pb-4" >
                    <h2 className="text-primary pt-4 text-center">Våra produkter</h2>
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="modern-input form-control"
                                    placeholder="Sök produkter..."
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select className="modern-input form-select">
                                    <option value="">Sortera efter</option>
                                    <option value="price">Pris</option>
                                    <option value="height">Max höjd</option>
                                </select>
                            </div>

                            {/* TODO: change to toggleable icons  */}
                            <div className="col-6">
                                <select className="modern-input form-select">
                                    <option value="">Saxlift</option>
                                    <option value="el">Bomlift</option>
                                    <option value="diesel">Pelarlift</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container className="my-5">
                <Row>
                    {lifts && lifts.length > 0 ? (
                        lifts.map((product: Lift) => (
                            <Col
                                key={product.id}
                                xs="12"
                                md="6"
                                lg="6"
                                className="mb-4 d-flex align-items-stretch"
                            >
                                <ProductCard lift={product} />
                            </Col>
                        ))
                    ) : (
                        <Col xs="12">
                            <div className="alert alert-warning">No products found.</div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}