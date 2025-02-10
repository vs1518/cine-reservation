import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎬 Cine-Réservation</h1>
      <div>
        <button className="bg-blue-600 px-4 py-2 rounded-lg mr-2 hover:bg-blue-700">
          Connexion
        </button>
        <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
          Inscription
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
