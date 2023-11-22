import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header className="pt-4 pb-4 absolute z-10 text-white bg-black w-full">
      <div className="flex justify-between mx-auto items-center max-w-6xl pl-3">
        <h1 className="flex p-2">
          <Link to="/">
            <span className="font-bold text-sm sm:text-xl border-b-2 border-black">
              Logo
            </span>
          </Link>
        </h1>
        <ul className="text-white flex gap-6 text-sm font-semibold">
          <li className="hidden sm:inline pl-1 pr-1 pb-1 pt-1  cursor-pointer border-black border-b-[0.5px] hover:border-b-[0.5px] hover:border-white">
            <Link to="/">Home</Link>
          </li>

          <li className="hidden sm:inline pl-1 pr-1 pb-1 pt-1  cursor-pointer border-black border-b-[0.5px] hover:border-b-[0.5px] hover:border-white">
            <Link to="/">Buy</Link>
          </li>
          <li className="hidden sm:inline pl-1 pr-1 pb-1 pt-1  cursor-pointer border-black border-b-[0.5px] hover:border-b-[0.5px] hover:border-white">
            <Link to="/">Sell</Link>
          </li>
          <li className="hidden sm:inline pl-1 pr-1 pb-1 pt-1  cursor-pointer border-black border-b-[0.5px] hover:border-b-[0.5px] hover:border-white">
            <Link to="/about">About</Link>
          </li>
          <li className=" pl-1 pr-1 pb-1 pt-1  cursor-pointer border-black border-b-[0.5px] hover:border-b-[0.5px] hover:border-white">
            <Link to="/sign-in">SignIn</Link>
          </li>
        </ul>
        <form className="pl-2 pr-2 mr-2 rounded-lg flex items-center relative">
          <input
            className="w-20 sm:w-64 pb-2 pt-2 border-black border-b-2 bg-transparent relative focus:bg-slate-900 focus:outline-none focus:border-white focus:border-b-2 text-sm sm:text-sm hover:border-b-2 hover:border-white"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className=" opacity-[0.5] text-sm absolute right-1" />
        </form>
      </div>
    </header>
  );
};
