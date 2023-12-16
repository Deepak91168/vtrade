import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOAuthClick = async () => {
    try {
      // console.log("OAuth Clicked");
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      //Response from google firebase
      const res = await signInWithPopup(auth, provider);
      const data = await res.user;

      const result = await axios.post(
        "/api/auth/google",
        {
          name: data.displayName,
          email: data.email,
          avatar: data.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //? [--- Took lot of time :') ---] To get cookie from server side, normal cookies are allowed but as we have firebase app we need to set this to true.
        }
      );
      dispatch(signInSuccess(result.data)); // Use data from server to update redux store
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <button
      onClick={handleOAuthClick}
      type="button"
      className="flex items-center justify-center transition ease-in-out duration-300 mt-2 font-thin rounded-sm border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600"
    >
      <FcGoogle className="text-[16px] mr-1" />
      <p> Continue with Google</p>
    </button>
  );
};
