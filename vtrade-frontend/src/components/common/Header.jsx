import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    //TODO: Make Nav Bar fixed and make sure to add bg-black when content is scrolled
    <header className="pt-4 pb-4 z-10 text-white bg-transparent w-full">
      <div className="flex justify-between mx-auto items-center max-w-6xl">
        <h1 className="flex p-2">
          <Link to="/">
            <span className="pl-4 pt-2 font-bold text-md sm:text-xl border-b-2 border-transparent">
              Logo
            </span>
          </Link>
        </h1>
        <form className="pl-2 pt-1 w-80 sm:w-1/3 rounded-lg flex items-center justify-around relative">
          <input
            className="transition ease-in-out duration-500 w-[75%] sm:w-full p-2 border-transparent border-b-[1px] bg-transparent relative focus:bg-transparent focus:outline-none focus:border-white focus:border-b-[1px] text-[12px] sm:text-sm hover:border-b-[1px] hover:border-slate-500"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className=" opacity-[0.5] text-[12px] sm:text-sm absolute right-12 sm:right-4" />
        </form>
        <ul className="text-white flex gap-2 md:gap-4 lg:gap-8 text-[12px] md:text-[13px] lg:text-sm font-semibold pr-4">
          <li className="transition ease-in-out hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500">
            <Link to="/">Home</Link>
          </li>
          <li className="transition ease-in-out hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500">
            <Link to="/">Buy</Link>
          </li>
          <li className="transition ease-in-out hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500">
            <Link to="/">Sell</Link>
          </li>
          <li className="transition ease-in-out hover:text-slate-400 hover:font-bold duration-500 hidden sm:inline p-1 pt-2  cursor-pointer border-black border-b-[1px] hover:border-b-[1px] hover:border-slate-500">
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
