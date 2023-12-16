import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VehicleSearch from "../vehicle/VehicleSearch";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
export const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const pathUrl = location.pathname;
  const [mobileViewActive, setMobileViewActive] = useState(false);
  const checkPath = (currentRoute) => {
    return currentRoute === pathUrl;
  };
  const HighlightActivePath = "bg-slate-800 ";

  const toggleNavButton = () => {
    setMobileViewActive(!mobileViewActive);
  };
  return (
    <header className="pt-4 pb-4 z-[25] text-white bg-black w-full fixed top-0 border-black border-b-2 shadow-slate-900 shadow-md">
      <div className="flex justify-between mx-auto items-center max-w-6xl">
        {/* Mobile Responsive */}
        <div
          className={`fixed z-10 top-0 right-0 bg-black backdrop-blur-lg bg-opacity-10 p-4 w-full mt-16 pt-10 ${
            !mobileViewActive && "hidden"
          }`}
        >
          <div>
            <motion.button
              whileHover={{
                rotate: 90,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              type="button"
              className="absolute z-10 top-1 right-4 transition ease-in-out duration-300 hover:bg-black p-2 cursor-pointer rounded-full"
            >
              <div
                onClick={() => {
                  setMobileViewActive(false);
                }}
              >
                <RxCross2 className="text-white text-xl" />
              </div>
            </motion.button>
            <li
              className={`transition ease-in-out ${
                checkPath("/") && HighlightActivePath
              } flex items-center justify-center text-slate-300 p-2 mt-1 rounded-md hover:bg-slate-800 transition ease-in-out duration-300`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`transition ease-in-out ${
                checkPath("/buy-vehicle") && HighlightActivePath
              } flex items-center justify-center p-2 rounded-md text-slate-300 mt-1 hover:bg-slate-800 transition ease-in-out duration-300`}
            >
              <Link to="/buy-vehicle">Buy</Link>
            </li>
            <li
              className={`transition ease-in-out ${
                (pathUrl === "/sell" || pathUrl === "/add-vehicle") &&
                HighlightActivePath
              } flex items-center justify-center p-2 rounded-md text-slate-300 mt-1 hover:bg-slate-800 transition ease-in-out duration-300`}
            >
              <Link to="/sell">Sell</Link>
            </li>
            <li
              className={`transition ease-in-out ${
                checkPath("/about") && HighlightActivePath
              } flex items-center justify-center p-2 rounded-md text-slate-300 mt-1 hover:bg-slate-800 transition ease-in-out duration-300`}
            >
              <Link to="/about">About</Link>
            </li>
          </div>
        </div>

        <h1 className="flex">
          <Link to="/">
            <div className="flex justify-center pl-4 items-center rounded-md transition ease-in-out duration-300">
              <img src={logo} alt="" className="h-6 sm:h-8 " />
              <span className="text-slate-400 pl-2 text-[0.8rem] sm:text-sm font-bold">
                VTRADE
              </span>
            </div>
          </Link>
        </h1>
        <VehicleSearch />
        <ul className="text-white flex gap-2 md:gap-4 lg:gap-8 text-[12px] md:text-[13px] lg:text-sm font-semibold pr-4">
          <li
            className={`transition ease-in-out ${
              checkPath("/") && HighlightActivePath
            } hidden sm:flex items-center text-slate-300 px-2 rounded-md hover:bg-slate-800 transition ease-in-out duration-300`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              checkPath("/buy-vehicle") && HighlightActivePath
            } hidden sm:flex items-center px-2 rounded-md text-slate-300 hover:bg-slate-800 transition ease-in-out duration-300`}
          >
            <Link to="/buy-vehicle">Buy</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              (pathUrl === "/sell" || pathUrl === "/add-vehicle") &&
              HighlightActivePath
            } hidden sm:flex items-center px-2 rounded-md text-slate-300 hover:bg-slate-800 transition ease-in-out duration-300`}
          >
            <Link to="/sell">Sell</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              checkPath("/about") && HighlightActivePath
            } hidden sm:flex items-center px-2 rounded-md text-slate-300  hover:bg-slate-800 transition ease-in-out duration-300`}
          >
            <Link to="/about">About</Link>
          </li>
          {!mobileViewActive && (
            <li className="flex sm:hidden justify-center items-center">
              <IoMenu
                onClick={toggleNavButton}
                className="text-slate-400 text-2xl cursor-pointer hover:text-slate-200 transition ease-in-out duration-300"
              />
            </li>
          )}

          {currentUser ? (
            <li>
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="user profile"
                  className="text-white transition ease-in-out duration-500 cursor-pointer rounded-full h-7 w-7 object-cover hover:opacity-80"
                />
              </Link>
            </li>
          ) : (
            <li
              className={`transition ease-in-out ${
                checkPath("/sign-in") && HighlightActivePath
              } flex items-center px-2 rounded-md text-slate-300 hover:bg-slate-800 transition ease-in-out duration-300`}
            >
              <Link to="/sign-in">SignIn</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
