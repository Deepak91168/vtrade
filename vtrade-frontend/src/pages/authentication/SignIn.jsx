import React from "react";
import Layout from "../../components/common/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formInputClass } from "../../assets/styles/commonClasses";

export const SignIn = () => {
  const navigate = useNavigate();

  //State Handling form Login Data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Handling form Submit
  const handeleSubmit = async (e) => {
    e.preventDefault();
    //API Call Backend API URL: http://localhost:3000/api/auth/login [For login]

    try {
      setLoading(true);
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
      console.log(data);
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  //Handling form Input
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };

  return (
    <Layout>
      <div className="max-w-2xl px-6 rounded-md p-4 mx-auto pt-20">
        <h1 className="text-slate-400 text-xl text-center mb-4 font-extrabold pb-4">
          <span color="text">Log In</span>
        </h1>

        <form onSubmit={handeleSubmit} className="text-white flex flex-col">
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
          <div>
            <div className="flex justify-between">
              <h1 className="text-[0.7rem] text-slate-300 mt-2 hover:text-white cursor-pointer">
                <Link to="/sign-up">Don&apos;t have an account?</Link>
              </h1>
              <h1 className="text-[0.7rem] text-red-500 mt-2 ">
                {error ? `Try Again!  *${error}` : null}
              </h1>
            </div>
            <button
              disabled={loading}
              className={`mt-4 font-thin rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium`}
            >
              {loading ? "Loading..." : "Log In"}
            </button>
            <p className="text-center text-[12px] text-slate-400 mt-2"> or </p>
            <button className="mt-2 font-thin rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium">
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
