import React from "react";
import Layout from "../../components/common/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputClass =
  "p-4 mb-4 border-slate-800 border-b-[2px] bg-transparent focus:bg-slate-900 focus:outline-none focus:border-white focus:border-b-[2px] text-sm sm:text-sm hover:border-b-[2px] hover:border-slate-500";

export const SignIn = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handeleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
  };
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
          {/* <input
            id="name"
            onChange={onChangeHandler}
            className={inputClass}
            type="text"
            placeholder="Name"
          />
          <input
            id="username"
            onChange={onChangeHandler}
            className={inputClass}
            type="text"
            placeholder="Username"
          /> */}
          <input
            id="email"
            onChange={onChangeHandler}
            className={inputClass}
            placeholder="Email"
            type="email"
          />
          <input
            id="password"
            onChange={onChangeHandler}
            className={inputClass}
            placeholder="Password"
            type="password"
          />
          <div>
            <div className="flex justify-between">
              <h1 className="text-[0.7rem] text-slate-300 mt-2 hover:text-white cursor-pointer">
                <Link to="/sign-up">Don't have an account?</Link>
              </h1>
              <h1 className="text-[0.7rem] text-red-500 mt-2 ">
                {error ? `Try Again!  *${error}` : null}
              </h1>
            </div>
            <button
              // disabled={loading}
              className={`mt-4 font-thin rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium`}
            >
              Log In
              {/* {loading ? "Loading..." : "Sign Up"} */}
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
