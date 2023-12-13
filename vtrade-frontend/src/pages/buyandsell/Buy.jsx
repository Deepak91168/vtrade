import axios from "axios";
import React, { useEffect, useState } from "react";
import VehicleCard from "../../components/vehicle/VehicleCard";
import { Loader } from "../../components/ui/Loader";
const Buy = () => {
  const [latestVehicles, setLatestVehicles] = useState([]);
  // const [offersVehicles, setOffersVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLatestVehicles = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/vehicle/get-vehicle`,
        { withCredentials: true }
      );
      setLatestVehicles(res.data);
      setLoading(false);
    };

    fetchLatestVehicles();
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-32">
          <Loader />
          <div className="text-slate-400 text-center">Loading...</div>
        </div>
      ) : (
        <div className="mt-28 mb-10  h-full">
          <div className="text-white w-full p-4 mb-10">
            <div className="mt-4">
              <div className="flex flex-wrap justify-center">
                {latestVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
