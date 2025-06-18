// components/ResultCard.jsx
export default function ResultCard({ title, description, image, tags }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-black">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
