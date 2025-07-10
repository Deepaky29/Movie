import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AnimeGrid from "./components/AnimeGrid";
import Favorites from "./components/Favorites";
import Footer from "./components/Footer";
import "./App.css";

// 📄 Home page — static sections
function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimeGrid title="🔥 Trending Anime" category="Trending" />
      <AnimeGrid title="💖 Romance Anime" category="Romance" />
      <Footer/>
    </>
  );
}

// 📄 Results page — dynamic query from URL
function ResultsPage() {
  const { query } = useParams();
  return (
    <AnimeGrid
      title={`🎬 Results for "${query}"`}
      category={query}
    />
  );
}

// 📄 App
function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <NavbarWithNavigate />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results/:query" element={<ResultsPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

// 📄 Wrapper to provide navigate() to Navbar
function NavbarWithNavigate() {
  const navigate = useNavigate();

  const handleSearchOrFilter = (value) => {
    navigate(`/results/${encodeURIComponent(value)}`);
  };

  return (
    <Navbar
      onSearch={handleSearchOrFilter}
      onFilter={handleSearchOrFilter}
    />
  );
}

export default App;
