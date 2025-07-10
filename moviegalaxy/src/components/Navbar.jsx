import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

function Navbar({ onSearch, onFilter }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const genres = ["Trending", "Action", "Romance", "Comedy", "Adventure"];

  const handleGenreSelect = (genre) => {
    if (onFilter) onFilter(genre);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const fetchSuggestions = debounce(async (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q, limit: 5 },
      });
      setSuggestions(res.data.data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSearch = (q) => {
    if (!q.trim()) return;
    if (onSearch) onSearch(q);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-purple-400 tracking-wide">
          <Link to="/">
            Anime Galaxy
          </Link>
        </h1>

        {/* Genres Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
          >
            Genres ▾
          </button>
          {showDropdown && (
            <div className="absolute left-0 mt-1 bg-gray-800 rounded shadow z-10">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link to="/favorites" className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm">
          ❤️ Favorites
        </Link>


        {/* Search */}
        <div className="relative">
          <div className="flex gap-2 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search anime..."
              value={query}
              onChange={handleInputChange}
              className="px-3 py-1 rounded bg-white text-black text-sm shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => handleSearch(query)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm shadow"
            >
              Search
            </button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white text-black mt-1 rounded shadow w-full z-10">
              {suggestions.map((anime) => (
                <li
                  key={anime.mal_id}
                  onClick={() =>
                    handleSearch(anime.title_english || anime.title)
                  }
                  className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer"
                >
                  {anime.title_english || anime.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
