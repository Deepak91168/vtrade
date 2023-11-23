import Layout from "../../components/common/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formInputClass } from "../../assets/styles/commonClasses";
import { LineWave } from "react-loader-spinner";
export const SignUp = () => {
  const navigate = useNavigate();

  //State Handling form SignUp Data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  const handeleSubmit = async (e) => {
    e.preventDefault();
    // API Call Backend API URL: http://localhost:3000/api/auth/signup [For signUp]
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl px-6 rounded-md p-4 mx-auto pt-20">
        <h1 className="text-slate-400 text-xl text-center mb-4 font-extrabold pb-4">
          <span color="text">Sign Up</span>
        </h1>

        <form onSubmit={handeleSubmit} className="text-white flex flex-col">
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
          <div>
            <div className="flex justify-between">
              <h1 className="text-[0.7rem] text-slate-300 mt-2 hover:text-white cursor-pointer">
                <Link to="/sign-in">Already have an account?</Link>
              </h1>
              <h1 className="text-[0.7rem] text-red-500 mt-2 ">
                {error ? `Try Again!  *${error}` : null}
              </h1>
            </div>
            {loading ? (
              <div>
                <button
                  disabled={loading}
                  className={`mt-4 font-thin  rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium`}
                >
                  Sign Up
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  {" "}
                  or{" "}
                </p>
                <button className="mt-2 font-thin rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:font-medium">
                  Continue with Google
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <LineWave
                  className="text-center border-2"
                  height="100"
                  width="100"
                  color="#4fa94d"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor="#4e4d4f"
                  middleLineColor="#4e4d4f"
                  lastLineColor="#4e4d4f"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};
