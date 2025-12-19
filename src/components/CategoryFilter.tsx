// src/components/CategoryFilter.tsx
import { useState } from "react";

interface FilterProps {
    onFilterChange: (sortBy: string) => void;
}

export default function CategoryFilter({ onFilterChange }: FilterProps) {
    const [sortBy, setSortBy] = useState("default");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <div className="flex justify-end mb-4">
            <select value={sortBy} onChange={handleChange} className="border rounded p-2">
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
            </select>
        </div>
    );
}
