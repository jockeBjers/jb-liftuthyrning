import { Button } from "react-bootstrap";

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
        <div className="d-flex gap-2 my-5">
            {options.map(option => (
                <Button
                    key={String(option.value)}
                    variant={
                        selected === option.value
                            ? `${option.variant || "primary"} ${option.textColor || "text-white"}`
                            : "outline-primary"
                    }
                    onClick={() => setSelected(option.value)}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    );
}
