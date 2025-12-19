import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    maxLength?: number;
    size?: number;
}

// 示例数据，可替换为 API
const sampleData = [
    "Medical Care",
    "Skin Care",
    "Health Food",
    "Supplements",
    "Vitamin C",
    "Face Cream",
    "Pain Relief",
];

export default function SearchBar({
    placeholder = "Search Category, Brands, Products",
    maxLength = 30,
    size = 30,
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            setShowDropdown(false);
        } else {
            const filtered = sampleData.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
            setShowDropdown(filtered.length > 0);
        }
    };

    const handleSelect = (item: string) => {
        setQuery(item);
        setShowDropdown(false);
        console.log("Selected:", item);
        // TODO: 可以触发搜索
    };

    const handleSearch = () => {
        console.log("Searching:", query);
        setShowDropdown(false);
        // TODO: implement search logic
    };

    // 点击组件外面，关闭 dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-md" ref={wrapperRef}>
            <input
                type="text"
                name="keywords"
                value={query}
                onChange={handleChange}
                size={size}
                maxLength={maxLength}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full px-4 py-2 pl-5 rounded-4xl border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none shadow-sm placeholder-gray-400 transition"
                role="textbox"
                aria-autocomplete="list"
                aria-haspopup="true"
                data-gtm-form-interact-field-id="0"
                onFocus={() => setShowDropdown(results.length > 0)}
            />
            <button
                onClick={handleSearch}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
            >
                <Search size={20} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
                <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
