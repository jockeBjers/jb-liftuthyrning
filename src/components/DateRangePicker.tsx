import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  handleStartDateChange: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  handleStartDateChange,
  setEndDate
}: DateRangePickerProps) {
  return (
    <Row className="g-3 mb-4">
      <Col xs="12" lg="6">
        <div className="d-flex flex-column">
          <label className="form-label text-white-50 mb-2">Startdatum</label>
          <DatePicker
            calendarStartDay={1}
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="modern-input form-control w-100"
            placeholderText="Välj startdatum"
          />
        </div>
      </Col>
      <Col xs="12" lg="6">
        <div className="d-flex flex-column">
          <label className="form-label text-white-50 mb-2">Slutdatum</label>
          <DatePicker
            calendarStartDay={1}
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            className="modern-input form-control w-100"
            placeholderText="Välj slutdatum"
          />
        </div>
      </Col>
    </Row>
  );
}
