import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function AnimeGrid({ title, category }) {
  const [animes, setAnimes] = useState([]);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://api.jikan.moe/v4/anime`, {
        params: {
          q: category,
          limit: 12,
        },
      })
      .then((res) => {
        const filtered = res.data.data.filter(
          (anime) => anime.title !== "Shiiku x Kanojo: Tenshi no Kousoku-hen"
        );
        setAnimes(filtered);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  const toggleWatchlist = (anime) => {
    let updated = [...watchlist];
    if (watchlist.find((a) => a.mal_id === anime.mal_id)) {
      updated = updated.filter((a) => a.mal_id !== anime.mal_id);
    } else {
      updated.push(anime);
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <section className="py-6 bg-black text-white relative">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          <img
            src="/goku-loader.gif"
            alt="Loading..."
            className="w-82 h-82 animate-pulse"
          />
          <p className="mt-4 text-purple-400 font-bold text-lg animate-pulse">
            Loading your anime…
          </p>
        </div>
      )}

      {!loading && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {animes.map((anime) => (
            <motion.div
              key={anime.mal_id}
              className="relative group cursor-pointer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={
                  anime.title_english || anime.title || anime.title_japanese
                }
                className="rounded-md w-full h-[250px] object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-3 transition">
                <h3 className="text-sm font-bold mb-2">{anime.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-4">
                  {anime.synopsis || "No description available."}
                </p>
                <div className="mt-2 text-yellow-400 font-semibold">
                  ⭐ {anime.score || "N/A"}
                </div>
                <button
                  onClick={() => toggleWatchlist(anime)}
                  className="mt-2 text-red-500 text-lg"
                >
                  {watchlist.find((a) => a.mal_id === anime.mal_id)
                    ? "❤️ Remove"
                    : "🤍 Add"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default AnimeGrid;
