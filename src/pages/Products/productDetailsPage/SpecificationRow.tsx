export default function SpecificationRow({ label, value, unit }: { label: string; value: string | number, unit?: string }) {
    return (
        <div className="col-sm-6">
            <div className="d-flex  py-2">
                <span className="text-white-50">{label}:&nbsp;</span>
                <span className="text-white">{value} {unit}</span>
            </div>
        </div>
    );
}