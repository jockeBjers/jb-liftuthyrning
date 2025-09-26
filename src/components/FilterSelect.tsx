interface FilterOption {
    label: string;
    value: string;
}

interface FilterGroup {
    label: string;
    options: FilterOption[];
}

interface FilterSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    groups?: FilterGroup[];
    placeholder?: string;
}

export default function FilterSelect({ 
    value, 
    onChange, 
    options, 
    groups, 
    placeholder = "Filtrera", 
}: FilterSelectProps) {
    return (
            <select
                className="modern-input form-select cursor-pointer "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {groups ? (
                    groups.map((group) => (
                        <optgroup key={group.label} label={group.label} className="bg-secondary text-primary">
                            {group.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </optgroup>
                    ))
                ) : (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )}
            </select>
    );
}