import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/ui/Container";
import Heading from "../../components/ui/Heading";
import { CgSoftwareUpload } from "react-icons/cg";
import { formInputClass } from "../../assets/styles/commonClasses";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { getRandomFileName } from "../../utils/RandomName";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaGasPump, FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
export const Profile = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [userVehicles, setUserVehicles] = useState([]);
  const [showListing, setShowListing] = useState(false);
  const dispatch = useDispatch();

  //* Avatar Upload
  // Handle Input Change for Avatar Upload
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  //TODO: [Feature] Make a check for file size

  //Upload file to firebase when file is changed
  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  //Upload file to firebase
  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const fileName = getRandomFileName(file);
    const storageRef = ref(storage, `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploadError(true);
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setProfileData({ ...profileData, avatar: downloadURL });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  // Handle Mouse Over and out for Avatar Upload
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // Set Avatar Upload Progress UI
  const setProgressUI = () => {
    if (uploadProgress === 100) {
      return "Image Uploaded Successfully";
    } else if (uploadProgress > 0 && uploadProgress < 100) {
      return `Uploading ${uploadProgress}%`;
    }
  };

  // Clear Upload Progress Info
  const clearUploadProgressInfo = () => {
    setUploadProgress(0);
    setUploadError(false);
  };

  // Clear Upload Progress Info after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      clearUploadProgressInfo();
    }, 5000);
  }, [uploadProgress]);

  //* Profile
  // Handle Form Change for Profile Update
  const handleOnChangeForm = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  //Update Profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log("User ID: ", currentUser._id);
      const response = await axios.post(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        JSON.stringify(profileData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //Delete Account
  const handleAccountDelete = async (e) => {
    console.log("delete");
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      await axios.delete(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        { withCredentials: true }
      );

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //Logout
  const handleLogOut = async () => {
    try {
      dispatch(logoutStart());
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
      dispatch(logoutFailure(error.message));
    }
  };

  //Show Vehicle Listings
  const handleShowVehicleListings = async () => {
    setShowListing((prev) => !prev);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/vehicle/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      setUserVehicles(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const calculatePercentageOffer = (priceRegular, priceDiscounted) => {
    const percentage = ((priceRegular - priceDiscounted) / priceRegular) * 100;
    return Math.round(percentage);
  };

  const handleVehicleDelete = async (vehicleID) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/vehicle/delete/${vehicleID}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUserVehicles((prev) =>
        prev.filter((vehicle) => vehicle._id !== vehicleID)
      );
      toast.success("Vehicle Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const setFuelType = (fuelType) => {
    if (
      fuelType === "Petrol" ||
      fuelType === "Diesel" ||
      fuelType === "CNG" ||
      fuelType === "LPG"
    ) {
      return <FaGasPump className="text-[0.8rem]" />;
    } else if (fuelType === "Electric") {
      return <MdElectricBolt className="text-[0.8rem]" />;
    } else if (fuelType === "Hybrid") {
      return <MdElectricCar className="text-[0.8rem]" />;
    } else {
      return <PiEngineFill className="text-[0.8rem]" />;
    }
  };
  return (
    <>
      <Container>
        <form className="bg-transparent border-slate-900 hover:border-slate-800 border-[0.5px] transition ease-in-out duration-500 pt-12 pb-8 p-4 bg-white bg-opacity-5 rounded-lg">
          <input
            type="file"
            onChange={handleOnChange}
            ref={imageRef}
            className="hidden "
            accept="image/*"
          />
          <div className="flex justify-center items-center relative">
            {isHovered && isEditing && (
              <div className="top-6 sm:top-8 absolute flex flex-col justify-between items-center">
                <div>
                  <CgSoftwareUpload className="text-slate-400 text-xl" />
                </div>
                <p className="text-slate-400 text-[0.6rem] font-extrabold pt-1">
                  Upload New
                </p>
              </div>
            )}
            <div className="w-full flex justify-center relative pb-6">
              <img
                onClick={() => imageRef.current.click()}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={` rounded-full object-cover ${
                  isEditing
                    ? "hover:opacity-10 cursor-pointer"
                    : "pointer-events-none"
                }  transition ease-in-out duration-500 w-20 h-20 sm:h-24 sm:w-24`}
                src={profileData?.avatar || currentUser.avatar}
                alt="userProfile"
              />

              <div className="text-slate-400 absolute bottom-0 text-[0.6rem]">
                {uploadError ? (
                  <p className="text-red-500">Error Uploading Image</p>
                ) : (
                  setProgressUI()
                )}
              </div>
            </div>
          </div>
          <Heading
            title={currentUser.name}
            className="font-extrabold mt-3 text-xl md:text-2xl lg:text-3xl  text-white"
          />
          <div className="w-full flex item-center justify-center">
            <hr className="text-slate-600 border-slate-600 w-20 lg:w-40 border-[0.5px] sm:border-[2px]" />
          </div>

          <div className="text-white text-[0.9rem] text-center mt-6">
            <h1 className="text-slate-400">{currentUser.username}</h1>
            <h1 className="text-slate-400 ">{currentUser.email}</h1>

            <div className="flex flex-col mt-4">
              <p
                onClick={handleLogOut}
                className="transition mt-4 ease-in-out duration-300 text-red-400 cursor-pointer text-[0.8rem]"
              >
                Log Out
              </p>

              <div className="w-full flex item-center justify-center p-4">
                <hr className="text-slate-600 border-slate-600 w-4" />
              </div>
              <p
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
                className={`transition ease-in-out duration-200  ${
                  isEditing ? "text-slate-300" : "text-slate-400"
                } cursor-pointer text-[0.8rem]`}
              >
                Edit Profile
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center items-center mt-4">
              {!isEditing && (
                <button
                  onClick={() => navigate("/add-vehicle")}
                  className={`transition ease-in-out bg-slate-800 duration-500 mt-4 rounded-lg border-slate-800 text-white w-full sm:w-[60%] md:w-[40%] pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:bg-transparent`}
                >
                  Add New Vehicle
                </button>
              )}
            </div>
          </div>
          <div>
            <div
              className={`w-full text-white mt-6 ${!isEditing && "hidden"} `}
            >
              <div className="mb-2">
                <label htmlFor="" className="text-slate-400 text-[0.8rem] pl-4">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  defaultValue={currentUser.name}
                  className={`${formInputClass} w-full pt-2`}
                  onChange={handleOnChangeForm}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="text-slate-400 text-[0.8rem] pl-4">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={currentUser.username}
                  className={`${formInputClass} + w-full`}
                  onChange={handleOnChangeForm}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="text-slate-400 text-[0.8rem] pl-4">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={currentUser.email}
                  className={`${formInputClass} + w-full`}
                  onChange={handleOnChangeForm}
                />
              </div>
              <div>
                <label htmlFor="" className="text-slate-400 text-[0.8rem] pl-4">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="New Password"
                  // value={currentUser.password}
                  className={`${formInputClass} + w-full`}
                  onChange={handleOnChangeForm}
                />
              </div>

              <div className="flex items-center space-x-8">
                <button
                  type="submit"
                  onClick={handleProfileUpdate}
                  className={`rounded-lg transition ease-in-out duration-500 mt-2 font-thin border-slate-800 text-white w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 `}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleAccountDelete}
                  className={`rounded-lg transition ease-in-out duration-500 mt-2 border-slate-800 text-red-500 w-full pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-red-700 hover:border-[0.5px] `}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="text-white flex justify-center mt-4">
          <button
            onClick={handleShowVehicleListings}
            className={`text-[0.7rem] text-slate-400 transition ease-in-out duration-300 hover:cursor-pointer hover:text-slate-200`}
          >
            {!showListing ? "Show Listed Vehicles" : "Hide Listed Vehicles"}
          </button>
        </div>
      </Container>
      {showListing && (
        <div className=" text-white w-full flex flex-wrap justify-center items-center gap-2 mt-4">
          {userVehicles &&
            userVehicles.length > 0 &&
            userVehicles.map((vehicle, index) => (
              <div
                // to="/"
                key={index}
                className="mt-2 hover:opacity-90 w-[80%] md:[w-30%] lg:w-[25%] xl:[w-20%] transition ease-in-out duration-300"
              >
                <div className="flex flex-col justify-center border-slate-800 rounded-lg border-2 mt-2 mb-2 transition ease-in-out duration-300  hover:border-slate-600">
                  <div className="">
                    <img
                      src={vehicle.imageURls[0]}
                      className=" object-cover w-full h-40 sm:h-32"
                      alt="Vehicle image"
                    />
                    {/* //TODO: [Feature] Show Color of Vehicle */}
                    {/* <FaCircle className="text-red-500 absolute top-0 right-0" /> */}
                  </div>
                  <div className="text-[0.6em] sm:text-[0.7em]">
                    <div className="flex space-x-4 justify-between bg-slate-800 p-4">
                      <div className="font-bold">{vehicle.vehicleName}</div>
                      <div>
                        &#x20B9;
                        {vehicle.priceRegular.toLocaleString("en-US")}
                      </div>
                      <div>
                        Driven {vehicle.kmsDriven.toLocaleString("en-US")} KMs
                      </div>
                      <div className="flex justify-center items-center">
                        {setFuelType(vehicle.fuelType)}
                        <p className="pl-2">{vehicle.fuelType}</p>
                      </div>
                    </div>
                    <div className="p-2 text-slate-300">
                      {vehicle.description.split(" ").slice(0, 30).join(" ")}
                    </div>
                    <div className="flex justify-between items-center p-4 mb-0 bg-slate-800">
                      <div className=" ">{vehicle.ownerContact}</div>
                      <div className=" ">{vehicle.transmission}</div>
                      <div className="">
                        {vehicle.offer
                          ? calculatePercentageOffer(
                              vehicle.priceRegular,
                              vehicle.priceDiscounted
                            ) + "% Off"
                          : "No offer"}
                      </div>
                      <div>
                        <div className="flex justify-end space-x-2 w-full bg-slate-800 p-1 sm:p-2">
                          <button
                            onClick={() => handleVehicleDelete(vehicle._id)}
                            className=""
                          >
                            <FaTrash className="text-[0.8rem] transition ease-in-out duration-100 hover:text-red-500" />
                          </button>
                          <button className="">
                            <FaEdit className="text-[0.8rem] transition ease-in-out duration-100 hover:text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
