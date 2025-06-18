// components/TagFilters.jsx
export default function TagFilters({ tags, selectedTag, onSelectTag, onClear }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, i) => (
        <button
          key={i}
          onClick={() => onSelectTag(tag)}
          className={`px-3 py-1 text-sm rounded-full border ${
            selectedTag === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {tag}
        </button>
      ))}
      {selectedTag && (
        <button
          onClick={onClear}
          className="px-3 py-1 text-sm rounded-full border bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
