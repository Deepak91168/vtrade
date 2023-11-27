import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/ui/Container";
import Heading from "../../components/ui/Heading";
import { CgSoftwareUpload } from "react-icons/cg";
import { formInputClass } from "../../assets/styles/commonClasses";
import { useEffect, useRef } from "react";
import { useState } from "react";
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
} from "../../redux/user/userSlice";

export const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  //TODO: Make a check for file size
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

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const setProgressUI = () => {
    if (uploadProgress === 100) {
      return "Image Uploaded Successfully";
    } else if (uploadProgress > 0 && uploadProgress < 100) {
      return `Uploading ${uploadProgress}%`;
    }
  };

  const clearUploadProgressInfo = () => {
    setUploadProgress(0);
    setUploadError(false);
  };

  useEffect(() => {
    setTimeout(() => {
      clearUploadProgressInfo();
    }, 5000);
  }, [uploadProgress]);

  const handleOnChangeForm = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

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
      // console.log(data);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
    // console.log("update");
  };

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

  return (
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
              src={profileData.avatar || currentUser.avatar}
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
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
              className={`transition ease-in-out duration-200  ${
                isEditing ? "text-slate-300" : "text-slate-400"
              } cursor-pointer text-[0.8rem] mt-4`}
            >
              Edit Profile
            </p>
            <div className="w-full flex item-center justify-center p-4">
              <hr className="text-slate-600 border-slate-600 w-4" />
            </div>
            <p className="transition ease-in-out duration-300 text-red-400 cursor-pointer text-[0.8rem]">
              Log Out
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex justify-center items-center mt-4">
            {!isEditing && (
              <button
                className={`transition ease-in-out bg-slate-800 duration-500 mt-4 rounded-lg border-slate-800 text-white w-full sm:w-[60%] md:w-[40%] pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:bg-transparent`}
              >
                Add New Vehicle
              </button>
            )}
          </div>
        </div>
        <div>
          <div className={`w-full text-white mt-6 ${!isEditing && "hidden"} `}>
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
    </Container>
  );
};
