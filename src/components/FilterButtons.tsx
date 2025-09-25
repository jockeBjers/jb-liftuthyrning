import { Button, Col, Row } from "react-bootstrap";

export type FilterOption<T> = {
    label: string;
    value: T;
    variant?: string;
    textColor?: string;
};

export default function FilterButtons<T>({
    options,
    selected,
    setSelected
}: {
    options: FilterOption<T>[];
    selected: T;
    setSelected: (value: T) => void;
}) {
    return (
        <Row className="g-2 mb-2 flex-wrap">
            {options.map(option => (
                <Col
                    key={String(option.value)}
                    xs={12}  
                    sm={4}  
                    md="auto"
                >
                    <Button
                        className={`w-100 ${selected === option.value ? option.textColor || "text-white" : ""}`}
                        variant={selected === option.value ? option.variant || "primary" : "outline-primary"}
                        onClick={() => setSelected(option.value)}
                    >
                        {option.label}
                    </Button>
                </Col>
            ))}
        </Row>

    );
}