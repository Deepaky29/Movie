import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    src: "/solo-leveling-trailer.mp4",
    title: "Solo Leveling",
    rating: "4.5/5",
    description:
      "Witness the rise of the weakest hunter who became the world’s strongest.",
  },
  {
    src: "/bleach-trailer.mp4",
    title: "Bleach: Thousand-Year Blood War",
    rating: "4.7/5",
    description: "Ichigo and his friends return to save the Soul Society once again.",
  },
  {
    src: "/demon-slayer-trailer.mp4",
    title: "Demon Slayer",
    rating: "4.8/5",
    description: "A young boy becomes a demon slayer to save his sister.",
  },
];

function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 15000); // switch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const current = videos[index];

  return (
    <section className="relative bg-black text-white h-[50vh] flex flex-col justify-center items-start px-8 md:px-16 overflow-hidden rounded-lg shadow-lg my-4">
      {/* Background Video */}
      <video
        key={current.src} // force reload when src changes
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
      >
        <source src={current.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <motion.h1
          key={current.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold mb-2"
        >
          {current.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center space-x-2 mb-2"
        >
          <div className="flex space-x-1 text-yellow-400">★ ★ ★ ★ ☆</div>
          <span className="text-sm text-gray-300">({current.rating})</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300 mb-3 text-sm md:text-base"
        >
          {current.description}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded shadow-lg text-sm md:text-base"
        >
          Watch Now
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;
