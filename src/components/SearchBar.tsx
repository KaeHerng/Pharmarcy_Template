// import { useState, useRef, useEffect } from "react";
// import { Search } from "lucide-react";
// import { createPortal } from "react-dom";

// interface SearchBarProps {
//   placeholder?: string;
//   maxLength?: number;
//   size?: number;
// }

// const sampleData = [
//   "Medical Care",
//   "Skin Care",
//   "Health Food",
//   "Supplements",
//   "Vitamin C",
//   "Face Cream",
//   "Pain Relief",
// ];

// export default function SearchBar({
//   placeholder = "Search Category, Brands, Products",
//   maxLength = 30,
//   size = 30,
// }: SearchBarProps) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<string[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.trim() === "") {
//       setResults([]);
//       setShowDropdown(false);
//     } else {
//       const filtered = sampleData.filter((item) =>
//         item.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filtered);
//       setShowDropdown(filtered.length > 0);
//     }
//   };

//   const handleSelect = (item: string) => {
//     setQuery(item);
//     setShowDropdown(false);
//   };

//   const handleSearch = () => {
//     console.log("Searching:", query);
//     setShowDropdown(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full max-w-md" ref={wrapperRef}>
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         size={size}
//         maxLength={maxLength}
//         placeholder={placeholder}
//         autoComplete="off"
//         className="w-full px-4 py-2 pl-5 rounded-4xl border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none shadow-sm placeholder-gray-400 transition"
//         onFocus={() => setShowDropdown(results.length > 0)}
//       />
//       <button
//         onClick={handleSearch}
//         className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition">
//         <Search size={20} />
//       </button>

//       {/* Only portal the dropdown */}
//       {showDropdown &&
//         createPortal(
//           <ul
//             className="absolute z-[9999] mt-1 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
//             style={{
//               top: wrapperRef.current?.getBoundingClientRect().bottom ?? 0,
//               left: wrapperRef.current?.getBoundingClientRect().left ?? 0,
//               position: "fixed",
//             }}>
//             {results.map((item, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-green-100 cursor-pointer"
//                 onClick={() => handleSelect(item)}>
//                 {item}
//               </li>
//             ))}
//           </ul>,
//           document.body
//         )}
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";

interface SearchBarProps {
  placeholder?: string;
  maxLength?: number;
  size?: number;
}

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    setQuery(item);         // ✅ Set input value
    setShowDropdown(false); // ✅ Close dropdown
  };

  const handleSearch = () => {
    console.log("Searching:", query);
    setShowDropdown(false);
  };

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
        ref={inputRef}
        value={query}
        onChange={handleChange}
        size={size}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-4 py-2 pl-5 rounded-4xl border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none shadow-sm placeholder-gray-400 transition"
        onFocus={() => setShowDropdown(results.length > 0)}
      />
      <button
        onClick={handleSearch}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition">
        <Search size={20} />
      </button>

      {showDropdown &&
        inputRef.current &&
        createPortal(
          <ul
            className="absolute z-[9999] mt-1 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
            style={{
              position: "fixed",
              top: inputRef.current.getBoundingClientRect().bottom + window.scrollY,
              left: inputRef.current.getBoundingClientRect().left + window.scrollX,
              width: inputRef.current.offsetWidth,
            }}>
            {results.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur before click
                  handleSelect(item);
                }}>
                {item}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}