import { Dropdown } from "react-bootstrap";

interface FilterOption {
    label: string;
    value: string;
    variant?: string;
    textColor?: string;
}

interface FilterDropdownProps {
    options: FilterOption[];
    selected: string;
    setSelected: (value: any) => void;
    placeholder?: string;
}

export default function FilterDropdown({
    options,
    selected,
    setSelected,
    placeholder = "Filter",
}: FilterDropdownProps) {
    const selectedOption = options.find(option => option.value === selected);
    const selectedLabel = selectedOption?.label || placeholder;
    const selectedVariant = selectedOption?.variant || "outline-primary";

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant={selectedVariant}
                className="filter-toggle"
            >
                {selectedLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu className="filter-menu">
                {options.map((option) => (
                    <Dropdown.Item
                        key={option.value}
                        active={selected === option.value}
                        onClick={() => setSelected(option.value)}
                    >
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}