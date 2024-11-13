// Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-semibold">Site Scribe</h1>
        <div className="space-x-4">
          <a href="#home" className="text-white">Home</a>
          <a href="#scraper" className="text-white">Scraper</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
