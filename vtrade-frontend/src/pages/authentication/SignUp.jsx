import Layout from "../../components/ui/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formInputClass } from "../../assets/styles/commonClasses";
import { Loader } from "../../components/ui/Loader";
import { OAuth } from "../../components/auth/OAuth";
import Container from "../../components/ui/Container";
import Heading from "../../components/ui/Heading";
export const SignUp = () => {
  const navigate = useNavigate();
  //State Handling form SignUp Data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  //State Handling for error and loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Handling form Input
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call Backend API URL: http://localhost:3000/api/auth/signup [For signUp]
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/auth/signup",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="mt-32">
      <Container>
        {/* ### Heading ###*/}
        <Heading title={"Sign Up"} />
        {/* --- Heading Ends --- */}

        {/* Form for Sign Up */}
        <form onSubmit={handleSubmit} className="text-white flex flex-col">
          {/* ### Input Section ###*/}
          <input
            id="name"
            onChange={onChangeHandler}
            className={formInputClass}
            type="text"
            placeholder="Name"
          />
          <input
            id="username"
            onChange={onChangeHandler}
            className={formInputClass}
            type="text"
            placeholder="Username"
          />
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
            {/* ### Do not have an account and error ### */}
            <div className="flex justify-between">
              <h1 className="transition ease-in-out duration-300 text-[0.7rem] text-slate-300 mt-2 hover:text-white cursor-pointer p-2">
                <Link to="/sign-in">Already have an account?</Link>
              </h1>
              <h1 className="text-[0.7rem] text-red-500 mt-2 ">
                {error ? `Try Again!  *${error}` : null}
              </h1>
            </div>
            {/* --- Do not have an account and error Ends --- */}

            {/* Conditional Rendering for Loader */}
            {!loading ? (
              <div className="p-2">
                <button
                  disabled={loading}
                  className={`transition ease-in-out duration-300 text-center mt-4 font-thin  rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600`}
                >
                  Sign Up
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
      </Container>
    </div>
  );
};
