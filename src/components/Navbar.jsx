import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileAlt } from "react-icons/fa";

const Navbar = ({ username }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-900 text-white shadow-md z-50">
      {/* Sección izquierda con el usuario */}
      <div className="text-lg font-semibold">
        Bienvenido, <span className="text-blue-400">{username}</span>
      </div>

      {/* Sección derecha con los enlaces */}
      <div className="flex space-x-6">
        <Link to="/home" className="flex items-center space-x-2 hover:text-yellow-400 transition">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/logs" className="flex items-center space-x-2 hover:text-yellow-400 transition">
          <FaFileAlt />
          <span>Logs</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
