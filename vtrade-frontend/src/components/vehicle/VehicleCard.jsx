import { FaGasPump, FaTrash, FaEdit } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { MdElectricBolt, MdElectricCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { useEffect, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { GiCarSeat } from "react-icons/gi";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import { FaRoad } from "react-icons/fa6";
import { motion } from "framer-motion";
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

const setEngineType = (transmission) => {
  if (transmission === "Automatic") {
    return <TbAutomaticGearbox className=" mr-1" />;
  } else {
    return <TbManualGearbox className=" mr-1" />;
  }
};

const VehicleCard = ({
  vehicle,
  index,
  handleVehicleDelete,
  edit,
  contactBtn,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageURls = vehicle.imageURls;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) =>
        currentImage === imageURls.length - 1 ? 0 : currentImage + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [imageURls.length]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      key={index}
      className="m-2 sm:mt-2 max-w-md transition ease-in-out duration-300 "
    >
      <div className="flex flex-col justify-center border-slate-800 rounded-md border-2 mt-2 mb-2 transition ease-in-out duration-300  hover:border-slate-600">
        <div className="">
          <img
            src={imageURls[currentImage]}
            className=" object-cover w-full h-40 sm:h-48 cursor-pointer"
            alt="Vehicle image"
            onClick={() => navigate(`/vehicle/${vehicle._id}`)}
          />
        </div>
        <div className="text-[0.6em] sm:text-[0.7em]">
          <div className="flex space-x-1 justify-between text-[0.7rem] sm:text-[0.8rem] font-extrabold p-4 bg-red-700">
            <div className="">
              {vehicle.modelYear} {vehicle.vehicleName}
            </div>
            <div className="text-sm">
              &#x20B9;{vehicle.priceRegular.toLocaleString("en-US")}/-
            </div>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-800 p-4">
            <div className="flex justify-center items-center pt-2 pb-2 p-4 bg-slate-600 rounded-md">
              {setFuelType(vehicle.fuelType)}
              <p className="pl-2">{vehicle.fuelType}</p>
            </div>
            <div className="flex justify-center items-center pt-2 pb-2 p-4 bg-slate-600 rounded-md">
              {setEngineType(vehicle.transmission)}
              <span>{vehicle.transmission}</span>
            </div>

            <div className="flex justify-center items-center pt-2 pb-2 p-4 bg-slate-600 rounded-md">
              <FaRoad className="mr-1" />
              {vehicle.kmsDriven.toLocaleString("en-US") + " KMs"}
            </div>
            <div className="flex justify-center items-center pt-2 pb-2 p-4 bg-slate-600 rounded-md">
              <GiCarSeat className="mr-1" />
              <p className="">{vehicle.seats}</p>
            </div>
          </div>
          <div className="p-2 text-slate-300">
            {vehicle.description.split(" ").slice(0, 30).join(" ")}...
          </div>
          <div className="flex justify-between items-center p-4 mb-0 bg-slate-800">
            <div className={!vehicle.offer && `hidden`}>
              <div className="flex items-center justify-center pt-2 pb-2 p-4 bg-slate-600 rounded-md">
                <BiSolidOffer className="text-lg" />
                <span className="pl-1  ">
                  {vehicle.offer &&
                    calculatePercentageOffer(
                      vehicle.priceRegular,
                      vehicle.priceDiscounted
                    ) + "% Off"}
                </span>
              </div>
            </div>

            <div className="">{vehicle.ownerType}</div>

            <div>
              <button
                onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                className="font-bold rounded-md hover:text-slate-200 transition ease-in-out duration-300"
              >
                Details
              </button>
            </div>
          </div>
          {edit && (
            <div className="text-white flex justify-between px-4 p-2 bg-slate-900">
              {contactBtn && (
                <div className="flex justify-between items-center ">
                  <div className="flex items-center">
                    <IoCall className="text-[0.8rem]" />
                    <span className="pl-1">{vehicle.ownerContact}</span>
                  </div>
                </div>
              )}

              <div className="">
                <div className="flex justify-end z-10 space-x-2 w-full bg-slate-600 rounded-md p-2  ">
                  <button
                    onClick={() => handleVehicleDelete(vehicle._id)}
                    className=""
                  >
                    <FaTrash className="text-[0.9rem] transition ease-in-out duration-100 hover:text-red-500" />
                  </button>
                  <button
                    onClick={() => navigate(`/edit-vehicle/${vehicle._id}`)}
                    className=""
                  >
                    <FaEdit className="text-[0.9rem] transition ease-in-out duration-100 hover:text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
