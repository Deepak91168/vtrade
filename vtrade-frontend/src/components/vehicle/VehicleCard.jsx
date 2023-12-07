import { FaGasPump, FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
const calculatePercentageOffer = (priceRegular, priceDiscounted) => {
  const percentage = ((priceRegular - priceDiscounted) / priceRegular) * 100;
  return Math.round(percentage);
};
const setFuelType = (fuelType) => {
  if (
    fuelType === "Petrol" ||
    fuelType === "Diesel" ||
    fuelType === "CNG" ||
    fuelType === "LPG"
  ) {
    return <FaGasPump className="text-[0.8rem]" />;
  } else if (fuelType === "Electric") {
    return <MdElectricBolt className="text-[0.8rem]" />;
  } else if (fuelType === "Hybrid") {
    return <MdElectricCar className="text-[0.8rem]" />;
  } else {
    return <PiEngineFill className="text-[0.8rem]" />;
  }
};
const VehicleCard = ({ vehicle, index, handleVehicleDelete }) => {
  console.log(vehicle);
  const navigate = useNavigate();
  return (
    <div
      // to="/"
      key={index}
      // onClick={() => navigate(`/vehicle/${vehicle._id}`)}
      className="mt-2 hover:opacity-90 w-[80%] md:[w-30%] lg:w-[25%] xl:[w-20%] transition ease-in-out duration-300"
    >
      <div className="flex flex-col justify-center border-slate-600 rounded-md border-2 mt-2 mb-2 transition ease-in-out duration-300  hover:border-slate-500">
        <div className="">
          <img
            src={vehicle.imageURls[0]}
            className=" object-cover w-full h-48 sm:h-64 cursor-pointer"
            alt="Vehicle image"
            onClick={() => navigate(`/vehicle/${vehicle._id}`)}
          />
          {/* //TODO: [Feature] Show Color of Vehicle */}
          {/* <FaCircle className="text-red-500 absolute top-0 right-0" /> */}
        </div>
        <div className="text-[0.6em] sm:text-[0.7em]">
          <div className="flex justify-between text-[0.7rem] sm:text-[0.9rem] font-extrabold p-2 pt-4 pb-4 bg-red-700">
            <div className="">
              {vehicle.modelYear} {vehicle.vehicleName}
            </div>
            <div className="text-sm">
              &#x20B9;{vehicle.priceRegular.toLocaleString("en-US")}/-
            </div>
          </div>
          <div className="flex space-x-4 justify-between bg-slate-800 p-4">
            <div className="">{vehicle.seats} Seater</div>
            <div>{vehicle.transmission}</div>
            <div>Driven {vehicle.kmsDriven.toLocaleString("en-US")} KMs</div>
            <div className="flex justify-center items-center">
              {setFuelType(vehicle.fuelType)}
              <p className="pl-2">{vehicle.fuelType}</p>
            </div>
          </div>
          <div className="p-2 text-slate-300">
            {vehicle.description.split(" ").slice(0, 40).join(" ")}...
          </div>
          <div className="flex justify-between items-center p-4 mb-0 bg-slate-800">
            <div className="flex justify-between items-center space-x-1">
              <IoCall className="text-[0.8rem]" />
              <p className="">{vehicle.ownerContact}</p>
            </div>
            {/* <div className=" ">{vehicle.transmission}</div> */}
            <div className="">
              {vehicle.offer
                ? calculatePercentageOffer(
                    vehicle.priceRegular,
                    vehicle.priceDiscounted
                  ) + "% Off"
                : "No offer"}
            </div>
            <div>
              <div className="flex justify-end z-10 space-x-2 w-full bg-slate-800 p-1 sm:p-2">
                <button
                  onClick={() => handleVehicleDelete(vehicle._id)}
                  className=""
                >
                  <FaTrash className="text-[0.8rem] transition ease-in-out duration-100 hover:text-red-500" />
                </button>
                <button
                  onClick={() => navigate(`/edit-vehicle/${vehicle._id}`)}
                  className=""
                >
                  <FaEdit className="text-[0.8rem] transition ease-in-out duration-100 hover:text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
