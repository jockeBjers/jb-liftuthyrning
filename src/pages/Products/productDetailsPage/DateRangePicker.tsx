import DatePicker from "react-datepicker";

export default function DateRangePicker({
    startDate,
    endDate, handleStartDateChange, setEndDate
}: {
    startDate: Date | null;
    endDate: Date | null;
    handleStartDateChange: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}) {
    return (<div className="row g-3 mb-4">
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
    </div>);
}