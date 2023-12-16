import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const VehicleSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    console.log("Vehicle Search " + searchQuery);
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm_URL = urlParams.get("searchTerm");
    setSearchTerm(searchTerm_URL);
  }, [location.search]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[60%] sm:w-[40%] rounded-lg flex items-center justify-around relative "
    >
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        className="transition ease-in-out duration-500 w-[75%] sm:w-full p-2 border-transparent border-b-[1px] bg-transparent relative focus:bg-transparent focus:outline-none focus:border-white focus:border-b-[1px] text-[12px] sm:text-sm hover:border-b-[1px] hover:border-slate-500"
        type="text"
        placeholder="Search..."
      />
      <button className="cursor-pointer transition ease-linear duration-300 opacity-[0.5] hover:opacity-100 text-[12px] sm:text-sm absolute right-12 sm:right-4">
        <FaSearch className="" />
      </button>
    </form>
  );
};

export default VehicleSearch;
