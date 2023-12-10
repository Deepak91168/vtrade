import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VehicleSearch from "../vehicle/VehicleSearch";
import logo from "../../assets/images/logo.png";
export const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const pathUrl = location.pathname;
  console.log(pathUrl);
  const checkPath = (currentRoute) => {
    return currentRoute === pathUrl;
  };
  const HighlightActivePath =
    "text-slate-400 font-bold border-slate-500 border-b-[1px]";

  return (
    //TODO: Make Nav Bar fixed and make sure to add bg-black when content is scrolled
    <header className="pt-4 pb-4 z-10 text-white bg-black w-full fixed top-0 border-black border-b-2 shadow-slate-900 shadow-md">
      <div className="flex justify-between mx-auto items-center max-w-6xl">
        <h1 className="flex p-2">
          <Link to="/">
            <div className="flex justify-center items-center ml-4">
              <img src={logo} alt="" className="h-12 " />
              <span className="text-slate-500 pl-2 font-bold">VTRADE</span>
            </div>
            {/* <span className="pl-4  font-bold text-md sm:text-lg border-transparent">
              VTRADE
            </span> */}
          </Link>
        </h1>
        <VehicleSearch />
        <ul className="text-white flex gap-2 md:gap-4 lg:gap-8 text-[12px] md:text-[13px] lg:text-sm font-semibold pr-4">
          <li
            className={`transition ease-in-out ${
              checkPath("/") && HighlightActivePath
            } hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              checkPath("/buy-vehicle") && HighlightActivePath
            } hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500`}
          >
            <Link to="/buy-vehicle">Buy</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              (pathUrl === "/sell" || pathUrl === "/add-vehicle") &&
              HighlightActivePath
            } hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500`}
          >
            <Link to="/sell">Sell</Link>
          </li>
          <li
            className={`transition ease-in-out ${
              checkPath("/about") && HighlightActivePath
            } hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500`}
          >
            <Link to="/about">About</Link>
          </li>
          {currentUser ? (
            <li>
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="user profile"
                  className="text-white mt-1 transition ease-in-out duration-500 cursor-pointer rounded-full h-7 w-7 hover:opacity-80"
                />
              </Link>
            </li>
          ) : (
            <li className="transition ease-in-out hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500">
              <Link to="/sign-in">SignIn</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
