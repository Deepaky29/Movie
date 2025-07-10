// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo or Name */}
        <div className="text-xl font-bold tracking-wider">
          Anime Galaxy<span className="text-purple-400"> ✨</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#home" className="hover:text-purple-400 transition duration-300">Home</a>
          <a href="#anime" className="hover:text-purple-400 transition duration-300">Anime</a>
          <a href="#genres" className="hover:text-purple-400 transition duration-300">Genres</a>
          <a href="#contact" className="hover:text-purple-400 transition duration-300">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} Anime Galaxy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
