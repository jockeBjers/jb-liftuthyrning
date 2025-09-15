import { useParams } from "react-router-dom";
import useLifts from "../../../hooks/useLifts";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReturnButton from "../../../components/ReturnButton";
import SpecificationRow from "./SpecificationRow";
import PriceRow from "./PriceRow";
import DateRangePicker from "./DateRangePicker";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { lift } = useLifts(id ? Number(id) : undefined);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [pricingType, setPricingType] = useState<'hourly' | 'daily'>('daily');

    if (!lift) return <div>Loading...</div>;

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // If start date is after end date, update end date to match start date
        if (date && endDate && date > endDate) {
            setEndDate(date);
        }
    };

    let fuelType = "Diesel";
    if (lift.fuel_id === 1) fuelType = "Eldriven";

    let category = "Saxlift";
    if (lift.category_id === 2) category = "Bomlift";
    else if (lift.category_id === 3) category = "Pelarlift";

    return (
        <div className="container my-5">
            <ReturnButton />
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div>
                        <h1 className="h3 bg-primary text-secondary mb-0 display-1 p-2">{lift.name}</h1>

                        <div className="card-body bg-body text-white p-4">
                            <p className="text-white-50 mt-3 mb-4">{lift.description}</p>
                            <div className=" pb-4 mb-0">
                                <h5 className="text-white mb-3">Tekniska specifikationer</h5>
                                <div className="row g-3">
                                    <SpecificationRow label="Typ" value={category} />
                                    <SpecificationRow label="Märke" value={lift.brand} />
                                    <SpecificationRow label="Bränsletyp" value={fuelType} />
                                    <SpecificationRow label="Max höjd" value={lift.max_height} unit="m" />
                                    <SpecificationRow label="Max vikt" value={lift.max_weight} unit="kg" />
                                    <SpecificationRow label="Korgstorlek" value={lift.platform_size} />
                                </div>
                            </div>
                            <div className="border-bottom border-secondary pb-2 mb-2">
                                <h5 className="text-white mb-3">Prislista</h5>
                                <div className="row g-3">
                                    <PriceRow label="Per timme" value={lift.hourly_price} />
                                    <PriceRow label="Per dag" value={lift.daily_price} />
                                    <PriceRow label="Startavgift" value={lift.start_fee} />
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
                                            Per dag ({lift.daily_price} kr/dag)
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
                                            Per timme ({lift.hourly_price} kr/h)
                                        </label>
                                    </div>
                                </div>

                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    handleStartDateChange={handleStartDateChange}
                                    setEndDate={setEndDate} />

                                <div className="bg-dark p-3 rounded mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-white-50">Total kostnad:</span>
                                        <span className="text-primary fw-bold fs-5">
                                            4200 kr
                                        </span>
                                    </div>
                                    <small className="text-white-50">
                                        (Inkl. startavgift: {lift.start_fee} kr)
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