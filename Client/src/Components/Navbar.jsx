import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";

const Navbar = ({ setQuery }) => { // Properly destructuring setQuery
  const { user,logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link to="/">Note App</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes"
        onChange={(e) => setQuery(e.target.value)} // Using setQuery correctly
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-white hidden md:block">{user.name}</span>

            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={logout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
