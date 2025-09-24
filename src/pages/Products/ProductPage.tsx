import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import type Lift from "../../interfaces/Lift";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
export default function ProductPage() {
    const initialLifts = useLoaderData() as Lift[];
    const [lifts] = useState<Lift[]>(initialLifts);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [categoryId, setCategoryId] = useState('');

    function matchesSearch(l: Lift, search: string) {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
            l.name.toLowerCase().includes(s) ||
            l.brand.toLowerCase().includes(s) ||
            l.description?.toLowerCase().includes(s) ||
            l.platformSize?.toLowerCase().includes(s) ||
            l.maxHeight.toString().includes(s) ||
            l.maxWeight.toString().includes(s) ||
            l.dailyPrice.toString().includes(s)
        );
    }

    function matchesCategoryFilter(l: Lift, categoryId: string) {
        if (!categoryId) return true;

        if (categoryId === l.categoryId?.toString()) return true;

        if (categoryId.startsWith("fuel-")) {
            return l.fuelId?.toString() === categoryId.replace("fuel-", "");
        }

        return false;
    }

    function sortLifts(a: Lift, b: Lift, sortBy: string) {
        switch (sortBy) {
            case "name": return a.name.localeCompare(b.name);
            case "-name": return b.name.localeCompare(a.name);
            case "dailyPrice": return a.dailyPrice - b.dailyPrice;
            case "-dailyPrice": return b.dailyPrice - a.dailyPrice;
            case "maxHeight": return a.maxHeight - b.maxHeight;
            case "-maxHeight": return b.maxHeight - a.maxHeight;
            default: return 0;
        }
    }

    const displayedLifts = [...lifts]
        .filter(l => matchesSearch(l, filter) && matchesCategoryFilter(l, categoryId))
        .sort((a, b) => sortLifts(a, b, sortBy));

    return (
        <>
            <Container>
                <div className="products-page my-5 text-center"></div>

                <div className="my-4">
                    <div className="w-100 bg-body pb-4 px-3 px-md-0">
                        <h2 className="text-primary pt-4 text-center">Våra produkter</h2>

                        <div className="row mb-2 justify-content-center">
                            <div className="col-12 mb-3">
                                <input
                                    type="text"
                                    className="modern-input form-control p-2"
                                    placeholder="Sök produkter..."
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6 mb-2">
                                <select
                                    className="modern-input form-select cursor-pointer p-2"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="">Sortera</option>
                                    <option value="name">A-Ö</option>
                                    <option value="-name">Ö-A</option>
                                    <option value="dailyPrice">Pris Lägst</option>
                                    <option value="-dailyPrice">Pris Högst</option>
                                    <option value="maxHeight">Minsta höjd först</option>
                                    <option value="-maxHeight">Högsta höjd först</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6 mb-2">
                                <select
                                    className="modern-input form-select cursor-pointer p-2"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Filtrera</option>
                                    <optgroup label="Kategorier" className="bg-secondary text-primary">
                                        <option value="1">Saxlift</option>
                                        <option value="2">Bomlift</option>
                                        <option value="3">Pelarlift</option>
                                    </optgroup>
                                    <optgroup label="Bränsletyper" className="bg-secondary text-primary">
                                        <option value="fuel-1">El</option>
                                        <option value="fuel-2">Diesel</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="my-5">
                <Row>
                    {displayedLifts.length > 0 ? (
                        displayedLifts.map((product: Lift) => (
                            <Col key={product.id} xs="12" md="6" lg="6" className="mb-4 d-flex align-items-stretch">
                                <ProductCard lift={product} />
                            </Col>
                        ))
                    ) : (
                        <Col xs="12" className="mb-4 d-flex align-items-stretch">
                            <div className="text-center text-white-50 min-vh-100">
                                Inga produkter hittades
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}
