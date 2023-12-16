import axios from "axios";
import { useEffect, useState } from "react";
import VehicleCard from "../../components/vehicle/VehicleCard";
import { Loader } from "../../components/ui/Loader";
import { toast } from "react-toastify";
const Buy = () => {
  const [latestVehicles, setLatestVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchLatestVehicles = async () => {
      setLoading(true);
      const res = await axios.get(`/api/vehicle/get-vehicle`, {
        withCredentials: true,
      });
      if (res.data.length > 9) {
        setShowMore(true);
      }
      setLatestVehicles(res.data);
      if (res.data.length >= 9) {
        setLatestVehicles(res.data.slice(0, 9));
      } else {
        setLatestVehicles(res.data);
      }
      setLoading(false);
    };

    fetchLatestVehicles();
  }, []);

  const handleShowMore = async () => {
    const currentNumberOfVehicles = latestVehicles.length;
    const startIndex = currentNumberOfVehicles;
    const limit = 6;
    try {
      const res = await axios.get(
        `/api/vehicle/get-vehicle?startIndex=${startIndex}&limit=${limit}`
      );
      setLatestVehicles([...latestVehicles, ...res.data]);
      if (res.data.length < limit) {
        setShowMore(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="mt-32">
          <Loader />
          <div className="text-slate-400 text-center">Loading...</div>
        </div>
      ) : (
        <div className="mt-28 ">
          <div className="text-white w-full p-4 lg:px-10 mb-10">
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
      {showMore && (
        <div
          onClick={handleShowMore}
          className="cursor-pointer text-slate-400 text-[0.8rem] font-semibold mb-[100px] text-center"
        >
          Show More
        </div>
      )}
    </>
  );
};

export default Buy;
