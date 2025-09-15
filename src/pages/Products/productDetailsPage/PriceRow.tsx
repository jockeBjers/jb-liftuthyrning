export default function PriceRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="col-sm-4">
            <div className="d-flex  py-2">
                <span className="text-white-50">{label}:&nbsp;</span>
                <span className="text-primary fw-bold">{value} kr</span>
            </div>
        </div>
    );
}