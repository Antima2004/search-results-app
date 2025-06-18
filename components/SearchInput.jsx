"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function SearchInput({ query, onChange, suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const router = useRouter();

  const handleSelect = (value) => {
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleClear = () => {
    onChange("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full mb-4">
      <div className="relative w-full">
        <input
          value={query}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          placeholder="Search by title or tag..."
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white text-black border mt-1 w-full rounded shadow-md max-h-40 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
