import Layout from "../../components/common/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formInputClass } from "../../assets/styles/commonClasses";
import { Loader } from "../../components/ui/Loader";
import { useSelector, useDispatch } from "react-redux";
import { OAuth } from "../../components/auth/OAuth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State Handling form Login Data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  
  //Handling for error and loading
  const { loading, error } = useSelector((state) => state.user);

  //!Bug: Handle error in UI it is always been visible since first occurrence.

  //*Handling form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API Call Backend API URL: http://localhost:3000/api/auth/login [For login]
    try {
      dispatch(signInStart());
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
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
      //Redirection to Home Page after successful login
      navigate("/");
    } catch (error) {
      console.log(error.response);
      dispatch(signInFailure(error.response.data.message));
    }
  };

  //*Handling form Input
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };

  return (
    <Layout>
      <div className="max-w-2xl px-6 rounded-md p-4 mx-auto pt-20">
        {/* ### Heading ###*/}
        <h1 className="cursor-default text-slate-400 text-xl text-center mb-4 font-extrabold pb-4">
          <span color="text">Log In</span>
        </h1>
        {/* --- Heading Ends --- */}

        {/* Form for Sign In/Log In */}
        <form onSubmit={handleSubmit} className="text-white flex flex-col">
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
            {!loading ? (
              <div className="p-2">
                <button
                  className={`transition ease-in-out duration-300 mt-4 font-thin  rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium`}
                >
                  Log In
                </button>
                <p className="cursor-default text-center text-[10px] text-slate-400 mt-2">
                  {" "}
                  or{" "}
                </p>
                <OAuth />
              </div>
            ) : (
              <Loader />
            )}
            {/* --- Conditional Rendering for Loader Ends --- */}
          </div>
        </form>
      </div>
    </Layout>
  );
};
