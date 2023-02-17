import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => (
  <ul className="flex items-center justify-center">
    <li>
      <Link
        className="text-green-500 bg-transparent border-t border-l border-b border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/"
      >
        Roadmap
      </Link>
    </li>
    <li>
      <Link
        className="text-green-500 bg-transparent border-l border-t border-b border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/my-scoogis"
      >
        My Scoogis
      </Link>
    </li>
    <li>
      <Link
        className="text-green-500 bg-transparent border-l border-t border-b border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/team"
      >
        Team
      </Link>
    </li>
    <li>
      <Link
        className="text-green-500 bg-transparent border-t border-l border-b border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/rarities"
      >
        Rarities
      </Link>
    </li>
    <li>
      <Link
        className="text-green-500 bg-transparent border-t border-r border-l border-b border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/battle"
      >
        Battle
      </Link>
    </li>
    <li>
      <Link
        className="text-green-500 bg-transparent border-t border-r border-b rounded-r border-green-500 bg-green-700 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
        to="/leaderboard"
      >
        Leaderboard
      </Link>
    </li>
  </ul>
);
