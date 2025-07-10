import { useEffect, useState } from "react";

function Favorites() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  const removeFromWatchlist = (anime) => {
    const updated = watchlist.filter((a) => a.mal_id !== anime.mal_id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <section className="py-6 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4 px-4">❤️ Your Favorites</h2>

      {watchlist.length === 0 ? (
        <p className="px-4">No favorites yet. Go add some!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {watchlist.map((anime) => (
            <div key={anime.mal_id} className="relative group cursor-pointer">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title_english || anime.title}
                className="rounded-md w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-3 transition">
                <h3 className="text-sm font-bold mb-2">{anime.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-4">
                  {anime.synopsis || "No description available."}
                </p>
                <button
                  onClick={() => removeFromWatchlist(anime)}
                  className="mt-2 text-red-500 text-lg"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
