'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // ✅ for reading URL query
import mockData from "@/data/mockData";
import ResultCard from "@/components/ResultCard";
import TagFilters from "@/components/TagsFilters";
import SearchInput from "@/components/SearchInput";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [query, setQuery] = useState(q); // ✅ Initialize with query param
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const allTags = [...new Set(mockData.flatMap(item => item.tags))];

  useEffect(() => {
    setTimeout(() => {
      setResults(mockData);
      setLoading(false);
    }, 1000); // simulate fetch
  }, []);

  useEffect(() => {
    setQuery(q); // ✅ update query if URL param changes
  }, [q]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleClearFilters = () => {
    setSelectedTag("");
    setQuery("");
  };

  const handleSearchChange = (val) => {
    setQuery(val);
    const matchSuggestions = [...new Set(
      mockData
        .flatMap(item => [item.title, ...item.tags])
        .filter(s => s.toLowerCase().includes(val.toLowerCase()))
    )];
    setSuggestions(matchSuggestions);
  };

  const handleSuggestionSelect = (val) => {
    setQuery(val);
    setSuggestions([]);
  };

  const filteredResults = results.filter(item => {
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    const matchesQuery = query
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      : true;
    return matchesTag && matchesQuery;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SearchInput
        query={query}
        onChange={handleSearchChange}
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
      />
      <TagFilters
        tags={allTags}
        selectedTag={selectedTag}
        onSelectTag={handleTagClick}
        onClear={handleClearFilters}
      />
      {loading ? (
        <p className="text-center text-gray-500">Loading results...</p>
      ) : filteredResults.length === 0 ? (
        <p className="text-center text-red-500">No results found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResults.map(result => (
            <ResultCard key={result.id} {...result} />
          ))}
        </div>
      )}
    </div>
  );
}
