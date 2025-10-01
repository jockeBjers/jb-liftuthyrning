
interface SortOption {
    label: string;
    value: string;
}

interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SortOption[];
    placeholder?: string;
}

export default function SortSelect({ 
    value, 
    onChange, 
    options, 
    placeholder = "Sortera", 
}: SortSelectProps) {
    return (
            <select
                 className="modern-input form-select cursor-pointer "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
    );
}