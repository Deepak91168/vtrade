import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formInputClass } from "../../assets/styles/commonClasses";
import { Loader } from "../../components/ui/Loader";
import { useSelector, useDispatch } from "react-redux";
import { OAuth } from "../../components/auth/OAuth";
import Container from "../../components/ui/Container";
import Heading from "../../components/ui/Heading";
import { toast } from "react-toastify";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  //State Handling form Login Data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //Handling for error and loading

  //*Handling form Input
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  //*Handling form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post(
        "/api/auth/login",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <div className="mt-32">
      <Container>
        {/* ### Heading ###*/}
        <Heading title={"Log In"} />
        {/* --- Heading Ends --- */}

        {/* Form for Sign In/Log In */}
        <form className="text-white flex flex-col">
          {/* ### Input Section ###*/}
          <input
            id="email"
            onChange={onChangeHandler}
            className={formInputClass}
            placeholder="Email"
            type="email"
          />
          <input
            id="password"
            onChange={onChangeHandler}
            className={formInputClass}
            placeholder="Password"
            type="password"
          />
          {/* --- Input Section Ends --- */}

          <div>
            {/* ### Already have an account and error ###*/}
            <div className="flex justify-between">
              <h1 className="transition ease-in-out duration-300 text-[0.7rem] text-slate-300 mt-2 hover:text-white cursor-pointer p-2">
                <Link to="/sign-up">Don&apos;t have an account?</Link>
              </h1>
              <h1 className=" text-[0.7rem] text-red-500 mt-2 ">
                {error ? `Try Again!  *${error}` : null}
              </h1>
            </div>
            {/* --- Already have an account and error Ends --- */}

            {/* Conditional Rendering for Loader */}

            <div className="p-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className={`transition ease-in-out duration-300 mt-4 font-thin  rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600`}
              >
                Log In
              </button>
              <p className="cursor-default text-center text-[10px] text-slate-400 mt-2">
                or
              </p>
              <OAuth />
            </div>

            {loading && (
              <div className=" flex justify-center items-center pl-6">
                <Loader />
              </div>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
};
