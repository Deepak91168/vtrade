import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VehicleCard from "../../components/vehicle/VehicleCard";
import { Loader } from "../../components/ui/Loader";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";

const SearchVehicle = () => {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filterData, setFilterData] = useState({
    searchTerm: "",
    ownerType: "",
    transmission: "",
    fuelType: "",
    seats: "",
    color: "",
    bodyType: "",
    offer: false,
    priceMin: 0,
    priceMax: "",
    modelYearMin: 2000,
    modelYearMax: new Date().getFullYear(),
    kmsDrivenMin: 0,
    kmsDrivenMax: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const sortFromURL = urlParams.get("sort");
    const ownerTypeFromURL = urlParams.get("ownerType");
    const transmissionFromURL = urlParams.get("transmission");
    const fuelTypeFromURL = urlParams.get("fuelType");
    const seatsFromURL = urlParams.get("seats");
    const colorFromURL = urlParams.get("color");
    const bodyTypeFromURL = urlParams.get("bodyType");
    const offerFromURL = urlParams.get("offer");
    const priceMinFromURL = urlParams.get("priceMin");
    const priceMaxFromURL = urlParams.get("priceMax");
    const modelYearMinFromURL = urlParams.get("modelYearMin");
    const modelYearMaxFromURL = urlParams.get("modelYearMax");
    const kmsDrivenMinFromURL = urlParams.get("kmsDrivenMin");
    const kmsDrivenMaxFromURL = urlParams.get("kmsDrivenMax");
    const orderFromURL = urlParams.get("order");
    if (
      searchTermFromURL ||
      sortFromURL ||
      ownerTypeFromURL ||
      transmissionFromURL ||
      fuelTypeFromURL ||
      seatsFromURL ||
      colorFromURL ||
      bodyTypeFromURL ||
      offerFromURL ||
      priceMinFromURL ||
      priceMaxFromURL ||
      modelYearMinFromURL ||
      modelYearMaxFromURL ||
      kmsDrivenMinFromURL ||
      kmsDrivenMaxFromURL ||
      orderFromURL
    ) {
      setFilterData((prev) => ({
        ...prev,
        searchTerm: searchTermFromURL || "",
        sort: sortFromURL || "createdAt",
        ownerType: ownerTypeFromURL || "all",
        transmission: transmissionFromURL || "all",
        fuelType: fuelTypeFromURL || "all",
        seats: seatsFromURL || "all",
        color: colorFromURL || "all",
        bodyType: bodyTypeFromURL || "all",
        offer: offerFromURL === "true" ? true : false,
        priceMin: priceMinFromURL || 0,
        priceMax: priceMaxFromURL || "",
        modelYearMin: modelYearMinFromURL || "",
        modelYearMax: modelYearMaxFromURL || new Date().getFullYear(),
        kmsDrivenMin: kmsDrivenMinFromURL || 0,
        kmsDrivenMax: kmsDrivenMaxFromURL || "",
        order: orderFromURL || "desc",
      }));
    }
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        const res = await axios.get(`/api/vehicle/get-vehicle?${searchQuery}`, {
          withCredentials: true,
        });
        setVehicleData(res.data);
        if (res.data.length > 9) {
          setShowMore(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [location.search]);

  const handleChange = (e) => {
    e.preventDefault();
    if (
      e.target.id === "priceMin" ||
      e.target.id === "priceMax" ||
      e.target.id === "modelYearMin" ||
      e.target.id === "modelYearMax" ||
      e.target.id === "kmsDrivenMin" ||
      e.target.id === "kmsDrivenMax"
    ) {
      setFilterData((prev) => ({
        ...prev,
        [e.target.name]: parseInt(e.target.value),
      }));
    }
    if (e.target.id === "sort_order") {
      console.log(e.target.value);
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setFilterData((prev) => ({
        ...prev,
        sort,
        order,
      }));
    } else {
      setFilterData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filterData.searchTerm);
    urlParams.set("sort", filterData.sort);
    urlParams.set("ownerType", filterData.ownerType);
    urlParams.set("transmission", filterData.transmission);
    urlParams.set("fuelType", filterData.fuelType);
    urlParams.set("seats", filterData.seats);
    urlParams.set("color", filterData.color);
    urlParams.set("bodyType", filterData.bodyType);
    urlParams.set("offer", filterData.offer);
    urlParams.set("priceMin", filterData.priceMin);
    urlParams.set("priceMax", filterData.priceMax);
    urlParams.set("modelYearMin", filterData.modelYearMin);
    urlParams.set("modelYearMax", filterData.modelYearMax);
    urlParams.set("kmsDrivenMin", filterData.kmsDrivenMin);
    urlParams.set("kmsDrivenMax", filterData.kmsDrivenMax);
    urlParams.set("order", filterData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const currentNumberOfVehicles = vehicleData.length;
    const startIndex = currentNumberOfVehicles;
    const limit = 6;
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      urlParams.set("limit", limit);
      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      const res = await axios.get(`/api/vehicle/get-vehicle?${searchQuery}`, {
        withCredentials: true,
      });
      setVehicleData([...vehicleData, ...res.data]);
      if (res.data.length < limit) {
        setShowMore(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center relative mt-24">
      <div className="flex flex-col md:flex-row">
        <div
          className={`p-0 md:p-4 md:h-screen border-r-[1px] fixed right-0 ${
            !filterActivated && "hidden"
          } z-10 bg-black backdrop-blur-md bg-opacity-[0.7] border-slate-700`}
        >
          <form onSubmit={handleFormSubmit} className="" action="">
            <div className="justify-center right-0 top-0">
              <div className="text-white">
                <motion.button
                  whileHover={{
                    rotate: 90,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  type="button"
                  onClick={() => setFilterActivated(false)}
                  className="absolute z-10 top-0 right-6 transition ease-in-out duration-300 bg-slate-800 hover:bg-black p-2 cursor-pointer rounded-full"
                >
                  <div>
                    <RxCross2 className="text-white text-md" />
                  </div>
                </motion.button>
              </div>
              <div className="text-slate-200 text-[0.8rem] sm:text-sm  flex gap-1 items-center p-4 pb-0">
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
                  name="searchTerm"
                  id="searchTerm"
                  onChange={handleChange}
                  value={filterData.searchTerm}
                />
              </div>
            </div>
            <div className="text-slate-200 flex flex-wrap sm:flex-col p-2 pt-0">
              <div className="flex justify-center w-full">
                <div className="flex-col sm:flex w-[50%]">
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Sort
                    </label>
                    <select
                      name="sort_order"
                      id="sort_order"
                      onChange={handleChange}
                      // value={filterData.sort}
                      className="bg-slate-800 rounded-md p-2 "
                    >
                      <option value="priceRegular_desc">
                        Price high to low
                      </option>
                      <option value="priceRegular_asc">
                        Price low to high
                      </option>
                      <option value="createdAt_desc">Latest</option>
                      <option value="createdAt_asc">Oldest</option>
                    </select>
                  </div>
                  <div className="flex flex-col p-2 text-[0.7rem] md:text-sm">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Ownership
                    </label>
                    <select
                      name="ownerType"
                      id="ownerType"
                      onChange={handleChange}
                      value={filterData.ownerType}
                      className="bg-slate-800 rounded-md p-2"
                    >
                      <option value="all">All</option>
                      <option value="1st Owner">1st Owner</option>
                      <option value="2nd Owner">2nd Owner</option>
                      <option value="3rd Owner">3rd Owner</option>
                    </select>
                  </div>
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Body Type
                    </label>
                    <select
                      name="bodyType"
                      onChange={handleChange}
                      value={filterData.bodyType}
                      className="bg-slate-800 rounded-md p-2"
                      id="bodyType"
                    >
                      <option value="all">All</option>
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
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Offer
                    </label>
                    <select
                      name="offer"
                      onChange={handleChange}
                      value={filterData.offer}
                      className="bg-slate-800 rounded-md p-2"
                      id="offer"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="flex-col sm:flex w-[50%]">
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      id="transmission"
                      onChange={handleChange}
                      value={filterData.transmission}
                      className="bg-slate-800 rounded-md p-2 "
                    >
                      <option value="all">All</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Engine
                    </label>
                    <select
                      name="fuelType"
                      id="fuelType"
                      onChange={handleChange}
                      value={filterData.fuelType}
                      className="bg-slate-800 rounded-md p-2"
                    >
                      <option value="all">All</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="LPG">LPG</option>
                    </select>
                  </div>
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Seats
                    </label>
                    <select
                      name="seats"
                      id="seats"
                      onChange={handleChange}
                      value={filterData.seats}
                      className="bg-slate-800 rounded-md p-2 "
                    >
                      <option value="all">All</option>
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div className="text-[0.7rem] md:text-sm flex flex-col p-2">
                    <label
                      htmlFor=""
                      className=" text-slate-400 mb-2 font-semibold"
                    >
                      Color
                    </label>
                    <select
                      name="color"
                      id="color"
                      onChange={handleChange}
                      value={filterData.color}
                      className="bg-slate-800 rounded-md p-2"
                    >
                      <option value="all">All</option>
                      <option className="" value="Silver">
                        Silver
                      </option>
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Grey">Grey</option>
                      <option value="Brown">Brown</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className=" justify-center hidden sm:flex">
                <div className="h-[1px] m-2 mt-4 w-[48px]  bg-slate-700"></div>
              </div>
              <div className="flex flex-wrap sm:flex-col justify-center mt-4 sm:mt-2 p-0 sm:p-4">
                <div className="text-[0.7rem] md:text-sm flex flex-col p-2 pt-0 ">
                  <label
                    htmlFor=""
                    className=" text-slate-400 mb-2 font-semibold"
                  >
                    &#x20B9; Price
                  </label>
                  <div className="flex flex-col sm:flex-row max-w-sm gap-2">
                    <input
                      type="text"
                      placeholder="min"
                      id="priceMin"
                      name="priceMin"
                      onChange={handleChange}
                      value={filterData.priceMin}
                      // defaultValue="50,000"
                      className="bg-transparent  transition w-[6rem] sm:w-auto ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                    <input
                      type="text"
                      placeholder="max"
                      id="priceMax"
                      value={filterData.priceMax}
                      name="priceMax"
                      onChange={handleChange}
                      className="bg-transparent transition w-[6rem] sm:w-auto ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                  </div>
                </div>

                <div className="text-[0.7rem] md:text-sm flex flex-col p-2 pt-0">
                  <label
                    htmlFor=""
                    className=" text-slate-400 mb-2 font-semibold"
                  >
                    Model Year
                  </label>
                  <div className="flex flex-col sm:flex-row max-w-sm gap-2">
                    <input
                      type="text"
                      id="modelYearMin"
                      name="modelYearMin"
                      onChange={handleChange}
                      value={filterData.modelYearMin}
                      placeholder="From"
                      className="bg-transparent transition w-[6rem] sm:w-auto ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                    <input
                      type="text"
                      placeholder="To"
                      id="modelYearMax"
                      name="modelYearMax"
                      onChange={handleChange}
                      value={filterData.modelYearMax}
                      className="bg-transparent transition w-[6rem] sm:w-auto ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                  </div>
                </div>
                <div className="text-[0.7rem] md:text-sm flex flex-col p-2 pt-0">
                  <label
                    htmlFor=""
                    className=" text-slate-400 mb-2 font-semibold"
                  >
                    KMs Driven
                  </label>
                  <div className="flex flex-col sm:flex-row max-w-sm gap-2">
                    <input
                      type="text"
                      id="kmsDrivenMin"
                      name="kmsDrivenMin"
                      onChange={handleChange}
                      value={filterData.kmsDrivenMin}
                      placeholder="min"
                      // defaultValue={0}
                      className="bg-transparent transition w-[6rem] sm:w-auto  ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                    <input
                      type="text"
                      id="kmsDrivenMax"
                      name="kmsDrivenMax"
                      onChange={handleChange}
                      value={filterData.kmsDrivenMax}
                      placeholder="Upto"
                      className="bg-transparent transition w-[6rem] sm:w-auto ease-linear duration-300 border-b-2 p-1 border-slate-700 hover:border-slate-500 outline-none focus:bg-slate-900 focus:border-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className={` w-[50%] text-center transition ease-in-out bg-slate-800 text-white duration-500 rounded-lg border-slate-800 pt-3 pb-3 border-[1px] text-[0.7rem] hover:border-slate-600 hover:bg-transparent`}
              >
                Apply Filter
              </button>
            </div>
          </form>
        </div>
        <div className="text-white md:pl-10 w-full">
          <div className="flex justify-center mt-10">
            <h4 className=" text-slate-400 font-extrabold flex justify-center sm:justify-start p-4">
              Search Results
            </h4>
            <div
              onClick={() => setFilterActivated((prev) => !prev)}
              className="text-slate-400 text-[0.7rem] cursor-pointer font-extrabold flex items-center p-4"
            >
              <FaFilter className="inline-block mr-1" />
              <span>Filter</span>
            </div>
          </div>
          {!loading ? (
            <>
              <div className="w-full flex flex-wrap justify-center items-center gap-2 mt-2">
                {vehicleData.length > 0 ? (
                  vehicleData.map((vehicle) => (
                    <VehicleCard
                      key={vehicle._id}
                      vehicle={vehicle}
                      edit={false}
                      contactBtn={false}
                    />
                  ))
                ) : (
                  <div className=" text-center p-4 pl-2 text-red-600 font-bold">
                    No vehicles found
                  </div>
                )}
              </div>
              {showMore && (
                <div
                  onClick={handleShowMore}
                  className="cursor-pointer text-slate-400 text-[0.8rem] font-semibold mb-[100px] text-center"
                >
                  Show More
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto ">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchVehicle;
