import { useParams } from "react-router-dom";
import useLifts from "../../hooks/useLifts";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReturnButton from "../../components/ReturnButton";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { lift: product, fetchLiftById } = useLifts();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [pricingType, setPricingType] = useState<'hourly' | 'daily'>('daily');
    useEffect(() => {
        if (id) fetchLiftById(Number(id));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // If start date is after end date, update end date to match start date
        if (date && endDate && date > endDate) {
            setEndDate(date);
        }
    };

    let fuelType = "Diesel";
    if (product.fuel_id === 1) fuelType = "Eldriven";

    let category = "Saxlift";
    if (product.category_id === 2) category = "Bomlift";
    else if (product.category_id === 3) category = "Pelarlift";

    return (
        <div className="container my-5">
            <ReturnButton />
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className=" border-0">
                        <div className="position-relative">
                            <img
                                src={`/images/products/${product.id}.jpg`}
                                alt={product.name}
                                className="card-img-top"
                                style={{ objectFit: 'cover', height: '400px' }}
                            />
                        </div>
                        <div className="card-body bg-body text-white p-4">
                            <div className="border-bottom border-secondary pb-3 mb-4">
                                <h1 className="h3 text-primary mb-2">{product.name}</h1>
                                <div className="text-muted">{category}</div>
                                <p className="text-white-50 mt-3 mb-0">{product.description}</p>
                            </div>
                            <div className=" pb-4 mb-4">
                                <h5 className="text-white mb-3">Tekniska specifikationer</h5>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="d-flex  py-2 border-bottom border-secondary">
                                            <span className="text-white-50">Märke:&nbsp;</span>
                                            <span className="text-white">{product.brand}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex  py-2 border-bottom border-secondary">
                                            <span className="text-white-50">Bränsletyp:&nbsp;</span>
                                            <span className="text-white">{fuelType}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex  py-2 border-bottom border-secondary">
                                            <span className="text-white-50">Max höjd:&nbsp;</span>
                                            <span className="text-white">{product.max_height} m</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex  py-2 border-bottom border-secondary">
                                            <span className="text-white-50">Max vikt:&nbsp; </span>
                                            <span className="text-white">{product.max_weight} kg</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex  py-2 border-bottom border-secondary">
                                            <span className="text-white-50">Korgstorlek:&nbsp;</span>
                                            <span className="text-white">{product.platform_size}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom border-secondary pb-4 mb-4">
                                <h5 className="text-white mb-3">Prislista</h5>
                                <div className="row g-3">
                                    <div className="col-sm-4">
                                        <div className="d-flex  py-2">
                                            <span className="text-white-50">Per timme:&nbsp;</span>
                                            <span className="text-primary fw-bold">{product.hourly_price} kr</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="d-flex  py-2">
                                            <span className="text-white-50">Per dag:&nbsp;</span>
                                            <span className="text-primary fw-bold">{product.daily_price} kr</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="d-flex  py-2">
                                            <span className="text-white-50">Startavgift:&nbsp;</span>
                                            <span className="text-primary fw-bold">{product.start_fee} kr</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-white mb-3">Boka lift</h5>
                                <div className="mb-3">
                                    <label className="form-label text-white-50">Pristyp</label>
                                    <div className="btn-group w-100" role="group">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="pricingType"
                                            id="daily"
                                            checked={pricingType === 'daily'}
                                            onChange={() => setPricingType('daily')}
                                        />
                                        <label className="btn btn-outline-primary" htmlFor="daily">
                                            Per dag ({product.daily_price} kr/dag)
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="pricingType"
                                            id="hourly"
                                            checked={pricingType === 'hourly'}
                                            onChange={() => setPricingType('hourly')}
                                        />
                                        <label className="btn btn-outline-primary" htmlFor="hourly">
                                            Per timme ({product.hourly_price} kr/h)
                                        </label>
                                    </div>
                                </div>


                                <div className="row g-3 mb-4">
                                    <div className="col-sm-6">
                                        <label className="form-label text-white-50">Startdatum</label>
                                        <DatePicker
                                            dateFormat={"dd/MM/yyyy"}
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            className="modern-input form-control"
                                            placeholderText="Välj startdatum"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-white-50">Slutdatum</label>
                                        <DatePicker
                                            dateFormat={"dd/MM/yyyy"}
                                            selected={endDate}
                                            onChange={date => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate || undefined}
                                            className="modern-input form-control"
                                            placeholderText="Välj slutdatum"
                                        />
                                    </div>
                                </div>
                                <div className="bg-dark p-3 rounded mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-white-50">Total kostnad:</span>
                                        <span className="text-primary fw-bold fs-5">
                                            4200 kr
                                        </span>
                                    </div>
                                    <small className="text-white-50">
                                        (Inkl. startavgift: {product.start_fee} kr)
                                    </small>
                                </div>


                                <button className="btn btn-primary btn-lg w-100 fw-bold mb-5" >
                                    Skicka bokningsförfrågan
                                </button>

                                <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique corrupti natus deserunt mollitia doloremque harum neque omnis obcaecati hic ratione, voluptatibus debitis nihil, quam consectetur sapiente? Blanditiis, dicta autem.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}