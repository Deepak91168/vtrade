import React from "react";

const SearchVehicle = () => {
  return (
    <div className="flex">
      <div className="">
        <form action="">
          <div className="text-slate-200 text-sm flex gap-2 items-center p-4">
            <label
              htmlFor="search"
              className="text-slate-400 font-semibold p-2 pl-0"
            >
              Search
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent transition ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
              name="search"
              id="search"
            />
          </div>
          <div className="text-slate-200 p-2 flex flex-wrap">
            <div className="text-sm m-2">
              <label htmlFor="" className="mr-2 text-slate-400 font-semibold">
                Transmission
              </label>
              <select
                name=""
                className="bg-slate-800 rounded-md p-2 text-sm"
                id=""
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="text-sm m-2">
              <label htmlFor="" className="mr-2 text-slate-400 font-semibold">
                Engine
              </label>
              <select
                name=""
                className="bg-slate-800 rounded-md p-2 text-sm"
                id=""
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="LPG">LPG</option>
              </select>
            </div>
            <div className="text-sm m-2">
              <label htmlFor="" className="mr-2 text-slate-400 font-semibold">
                Seats
              </label>
              <select
                name=""
                className="bg-slate-800 rounded-md p-2 text-sm"
                id=""
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="text-sm m-2">
              <label htmlFor="" className="mr-2 text-slate-400 font-semibold">
                Body Type
              </label>
              <select
                name=""
                className="bg-slate-800 rounded-md p-2 text-sm"
                id=""
              >
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="SUV">SUV</option>
                <option value="Crossover">Crossover</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Wagon">Wagon</option>
                <option value="Van">Van</option>
                <option value="Jeep">Jeep</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
            <div className="text-sm m-2">
              <label htmlFor="" className="mr-2 text-slate-400 font-semibold">
                Ownership
              </label>
              <select
                name=""
                className="bg-slate-800 rounded-md p-2 text-sm"
                id=""
              >
                <option value="1st Owner">1st Owner</option>
                <option value="2nd Owner">2nd Owner</option>
                <option value="3rd Owner">3rd Owner</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="text-white">
        <h1>Search Results</h1>
      </div>
    </div>
  );
};

export default SearchVehicle;
