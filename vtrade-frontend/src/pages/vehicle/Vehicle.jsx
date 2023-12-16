import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/vehicle/ImageSlider";
import { IoMdColorFill } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa";
import { FaGasPump } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { MdElectricBolt } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { TbAutomaticGearbox } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import ContactOwner from "../../components/owner/ContactOwner";
import { useSelector } from "react-redux";

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
    return <FaGasPump className="text-md mr-2" />;
  } else if (fuelType === "Electric") {
    return <MdElectricBolt className="text-md mr-2" />;
  } else if (fuelType === "Hybrid") {
    return <MdElectricCar className="text-md mr-2" />;
  } else {
    return <PiEngineFill className="text-md mr-2" />;
  }
};

const setEngineType = (transmission) => {
  if (transmission === "Automatic") {
    return <TbAutomaticGearbox className="text-md mr-2" />;
  } else {
    return <TbManualGearbox className="text-md mr-2" />;
  }
};

const Vehicle = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [vehicle, setVehicle] = useState(null); // [vehicle, setVehicle// [images, setImages
  const [loading, setLoading] = useState(false); // [loading, setLoading
  const [contactOwner, setContactOwner] = useState(false); // [contactOwner, setContactOwner
  const params = useParams();
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/vehicle/get-vehicle/${params.vehicleID}`
        );
        setVehicle(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [params.vehicleID]);
  return (
    <div className="">
      {vehicle && !loading ? (
        <div className="mt-32">
          <div className="flex flex-col sm:flex-row justify-center items-start w-full">
            <div className="w-full sm:max-w-md md:max-w-lg p-4 sm:p-2">
              {<ImageSlider images={vehicle.imageURls} />}
            </div>

            <div className="text-white w-full sm:w-auto mt-4 sm:mt-0 h-72 border-red-500 pt-2 p-4">
              <div className="font-bold pl-2 pb-4 ">
                <span className="text-sm">{vehicle.modelYear}</span>{" "}
                {vehicle?.vehicleName}
              </div>
              <div className="flex justify-start items-center font-bold space-x-2 pl-2">
                <div className="bg-slate-700 p-4 pt-2 pb-2 rounded-md text-[0.6rem]">
                  {vehicle.ownerType}
                </div>
                <div className="bg-slate-700 p-4 pt-2 pb-2 text-[0.6rem] rounded-md">
                  {vehicle.bodyType}
                </div>
                <div className="bg-slate-700 p-4 pt-2 pb-2 text-[0.6rem] rounded-md">
                  {vehicle.seats}
                  {" Seater"}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex m-2 text-slate-400 items-center">
                  {setEngineType(vehicle.transmission)}
                  <p className="text-sm ">{vehicle.transmission}</p>
                </div>
                <div className="flex m-2 text-slate-400 items-center">
                  <IoMdColorFill className="text-lg mr-2" />
                  <p className="text-sm ">{vehicle.color}</p>
                </div>
                <div className="flex m-2 text-slate-400 items-center">
                  <FaLocationDot className="text-md mr-2" />
                  <p className="text-sm">{vehicle.city}</p>
                </div>
                <div className="flex m-2 text-slate-400 items-center">
                  {setFuelType(vehicle.fuelType)}
                  <p className="text-sm">{vehicle.fuelType}</p>
                </div>
                <div className="flex m-2 text-slate-400 items-center">
                  <FaRoad className="text-md mr-2" />
                  <p className="text-sm">{vehicle.kmsDriven} KMs Driven</p>
                </div>
                {vehicle.offer && (
                  <div className="flex m-2 text-slate-400 items-center">
                    <BiSolidOffer className="text-md mr-2" />
                    <p className="text-sm">
                      {calculatePercentageOffer(
                        vehicle.priceRegular,
                        vehicle.priceDiscounted
                      )}
                      % off
                    </p>
                  </div>
                )}
              </div>
              <div>
                <div className="flex relative justify-end items-baseline border-slate-600 border-[0.5px] border-r-0 border-l-0 pl-2 pr-2 pt-2 pb-2">
                  <p className="text-white absolute top-[1/2] pl-2 left-0 text-[0.7rem] sm:text-[0.8rem]">
                    Price
                  </p>
                  {vehicle.offer ? (
                    <>
                      <p
                        className={
                          vehicle.offer &&
                          "line-through text-[0.7rem] pl-2 font-bold"
                        }
                      >
                        &#x20B9;{vehicle.priceRegular.toLocaleString("en-US")}/-
                      </p>

                      <p className="text-sm p-2 pb-0 pt-0 font-bold">
                        &#x20B9;
                        {vehicle.priceDiscounted.toLocaleString("en-US")}
                        /-
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm p-2 pb-0 pt-0 font-bold">
                        &#x20B9;
                        {vehicle.priceRegular.toLocaleString("en-US")}
                        /-
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-white mt-4 flex justify-start mx-auto md:max-w-3xl  pb-[64px] ">
            <div className="w-full mt-8 sm:mt-0 px-2">
              <p className="pl-4 font-bold text-slate-400 ">Description</p>
              <p className="text-[0.7rem] sm:text-sm p-4 text-slate-200">
                {vehicle.description}
              </p>

              {!currentUser ? (
                <p
                  onClick={() => navigate("/sign-in")}
                  className="text-[0.7rem] cursor-pointer mx-auto mb-4 w-full text-slate-400 text-center mt-4"
                >
                  Log In to contact Owner
                </p>
              ) : (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setContactOwner((prev) => !prev)}
                    className={` text-center transition ease-in-out ${
                      !contactOwner
                        ? "bg-slate-800 text-white"
                        : "bg-transparent border-none text-red-500"
                    } duration-500 rounded-lg border-slate-800 p-4 border-[1px] text-[0.6rem] sm:text-[0.7rem] hover:border-slate-600 hover:bg-transparent `}
                  >
                    {!contactOwner ? "Contact Owner" : "Close"}
                  </button>
                </div>
              )}
              {contactOwner &&
                currentUser &&
                currentUser._id === vehicle.userRef && (
                  <p className="text-[0.7rem] cursor-pointer mx-auto w-full text-slate-300  text-center">
                    You are the owner of this vehicle
                  </p>
                )}
              {contactOwner &&
                currentUser &&
                currentUser._id !== vehicle.userRef && (
                  <ContactOwner vehicle={vehicle} />
                )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

export default Vehicle;
//TODO: Handle UI when no listed vehicle present show a message