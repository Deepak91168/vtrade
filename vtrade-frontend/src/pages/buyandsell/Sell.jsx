import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/add-vehicle"); // Redirect to the home page or login page if user is not logged in
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="text-white text-md sm:text-lg mt-32 flex justify-center">
        <div>
          You Must{" "}
          <span
            className="text-slate-500 cursor-pointer font-bold"
            onClick={() => navigate("/sign-in")}
          >
            {" "}
            Sign In
          </span>{" "}
          to continue!
        </div>
      </div>
    );
  }

  navigate("/add-vehicle");

  return null;
};

export default Sell;
