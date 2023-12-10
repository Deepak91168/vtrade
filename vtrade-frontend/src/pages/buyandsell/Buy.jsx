import axios from "axios";
import React, { useEffect, useState } from "react";
import VehicleCard from "../../components/vehicle/VehicleCard";
const Buy = () => {
  const [latestVehicles, setLatestVehicles] = useState([]);
  const [offersVehicles, setOffersVehicles] = useState([]);
  useEffect(() => {
    const fetchLatestVehicles = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/vehicle/get-vehicle`,
        { withCredentials: true }
      );
      setLatestVehicles(res.data);
    };

    fetchLatestVehicles();
  }, []);

  return (
    <div className="mt-20">
      <div className="text-white w-full p-4 ">
        {/* <div className="flex justify-center">
          <h2 className="text-slate-400 font-bold text-xl">Latest</h2>
        </div> */}
        <div className="h-[100vh] mt-4 rounded-lg overflow-y-scroll">
          <div className="flex flex-wrap justify-center">
            {latestVehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="text-white">
        <div>
          <h2 className="text-slate-400 font-bold text-xl">Offers</h2>
        </div>
      </div> */}
    </div>
  );
};

export default Buy;
