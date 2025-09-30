import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import type Lift from "../../interfaces/Lift";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import SortSelect from "../../components/SortSelect";
import FilterSelect from "../../components/FilterSelect";
import type Fuel from "../../interfaces/Fuel";
import type Category from "../../interfaces/LiftCategory";

export default function ProductPage() {
    const { liftDetails, fuels, liftCategories } = useLoaderData() as {
        liftDetails: any[];
        fuels: Fuel[];
        liftCategories: Category[];
    };

    const [lifts] = useState<any[]>(liftDetails);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [categoryId, setCategoryId] = useState('');

    function matchesSearch(l: any, search: string) {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
            l.name.toLowerCase().includes(s) ||
            l.brand.toLowerCase().includes(s) ||
            l.description?.toLowerCase().includes(s) ||
            l.platformSize?.toLowerCase().includes(s) ||
            l.maxHeight.toString().includes(s) ||
            l.maxWeight.toString().includes(s) ||
            l.fuelName?.toLowerCase().includes(s) ||
            l.categoryName?.toLowerCase().includes(s) ||
            l.dailyPrice.toString().includes(s)
        );
    }

    function matchesCategoryFilter(l: any, filterValue: string) {
        if (!filterValue) return true;

        return (
            l.categoryName?.toLowerCase() === filterValue ||
            l.fuelName?.toLowerCase() === filterValue
        );
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

                        <Row className="mb-2 justify-content-center">
                            <Col xs="12" className="mb-3">
                                <SearchInput
                                    value={filter}
                                    onChange={setFilter}
                                    placeholder="Sök produkter..."
                                />
                            </Col>
                        </Row>

                        <Row className="g-3">
                            <Col xs="12" md="6">
                                <SortSelect
                                    value={sortBy}
                                    onChange={setSortBy}
                                    options={[
                                        { label: "A-Ö", value: "name" },
                                        { label: "Ö-A", value: "-name" },
                                        { label: "Pris Lägst", value: "dailyPrice" },
                                        { label: "Pris Högst", value: "-dailyPrice" },
                                        { label: "Minsta höjd först", value: "maxHeight" },
                                        { label: "Högsta höjd först", value: "-maxHeight" }
                                    ]}
                                />
                            </Col>
                            <Col xs="12" md="6">
                                <FilterSelect
                                    value={categoryId}
                                    onChange={setCategoryId}
                                    options={[]}
                                    groups={[
                                        {
                                            label: "Kategorier",
                                            options: liftCategories.map(category => ({
                                                label: category.name,
                                                value: category.name.toLowerCase()
                                            }))
                                        },
                                        {
                                            label: "Bränsletyper",
                                            options: fuels.map(fuel => ({
                                                label: fuel.name,
                                                value: fuel.name.toLowerCase()
                                            }))
                                        }
                                    ]}
                                />
                            </Col>
                        </Row>
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