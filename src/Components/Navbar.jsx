import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

function NavBar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-900 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-12 w-auto object-contain rounded-lg"
        />

        <span className="text-xl font-bold text-white hidden sm:inline">
          CineWorld
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg md:text-xl font-semibold text-white">
        <Link to="/" className="hover:underline">
          Movies
        </Link>
        <Link to="/watchlist" className="hover:underline">
          Watchlist
        </Link>
        <Link to="/recommend" className="hover:underline">
          Recommendations
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
