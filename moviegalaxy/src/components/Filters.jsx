function Filters({ onFilter }) {
  const genres = ["Trending", "Action", "Romance", "Comedy", "Adventure"];

  return (
    <div className="flex gap-4 flex-wrap px-4 py-2 bg-gray-800">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onFilter(genre)}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default Filters;
