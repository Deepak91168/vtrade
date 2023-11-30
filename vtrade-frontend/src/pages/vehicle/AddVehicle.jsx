import React from "react";
import { useState, useEffect } from "react";
import Heading from "../../components/ui/Heading";
import { CirclePicker } from "react-color";
import { formInputClass } from "../../assets/styles/commonClasses";
import VehicleColorMap from "../../utils/ColorMap";
import { getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getRandomFileName, getRandomValue } from "../../utils/RandomName";
import { RxCross2 } from "react-icons/rx";
import ImagePreview from "../../components/form/ImagePreview";
import Uploader from "../../components/form/Uploader";
import ImagePreviewModal from "../../components/ui/ImagePreviewModal";
// name
//       Brand -
//       city -
//       modelYear -
//       regularPrice -
//       description
//       fuelType-
//       transmission-
//       color -
//       seats -
//       bodyType-
//       ownerName -
//       owner -
//       kmsDriven -
//       imageUrls
//       features

const AddVehicle = () => {
  const [imageFile, setImageFile] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageURls: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState({
    error: false,
    message: "",
  });
  console.log(formData);
  const colors = ["Silver", "Black", "white", "Red", "Blue", "Grey", "Brown"]; // Seven colors

  const handleColorChange = (color) => {
    const colorName = color.hex;
    setSelectedColor(VehicleColorMap[colorName]);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files);
  };

  //TODO: Clear Input Fields after submission or error
  const clearFileField = () => {
    setImageFile([]);
  };

  const storeImageToFirebase = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // setUploading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          try {
            const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (imageFile.length === 0) {
      setUploadError({
        error: true,
        message: "Please select an image!",
      });
    } else if (
      imageFile.length > 0 &&
      imageFile.length + formData.imageURls.length <= 8
    ) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < imageFile.length; i++) {
        promises.push(storeImageToFirebase(imageFile[i]));
      }
      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageURls: formData.imageURls.concat(urls),
        });
        setUploading(false);
      } catch (error) {
        // Handle Error State
        setUploading(false);
        setUploadError({
          error: true,
          message: error.message,
        });
        // console.log("Here we encountered an error!");
        // console.log(error);
      }
    } else {
      setUploading(false);
      clearFileField();
      setUploadError({
        error: true,
        message: "Max 8 images are allowed!",
      });
      // console.log("Max Image length exceeded");
    }
    // console.log(imageFile);
  };
  const handleRemoveImagePreview = (index) => {
    setFormData({
      ...formData,
      imageURls: formData.imageURls.filter((_, i) => i !== index),
    });
  };
  const openPreview = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };
  useEffect(() => {
    setTimeout(() => {
      setUploadError({
        error: false,
        message: "",
      });
    }, 5000);
  }, [uploadError.error]);
  return (
    <div className="mt-8">
      <div>
        <Heading title="Add Vehicle for Sell" className="pb-0" />
        <div className="w-full flex item-center justify-center">
          <hr className="text-slate-600 border-slate-600 w-20 lg:w-40 border-[0.5px] sm:border-[2px]" />
        </div>
      </div>
      <div className="max-w-5xl mx-2 sm:mx-auto">
        <form className="mt-4 text-white" action="">
          <div className="">
            <Heading className="text-[0.9em] sm:text-md pb-0" title="Owner" />
            <div className="flex flex-col sm:flex-row space-x-4  items-center justify-center m-4 mb-0 sm:mx-auto mt-0">
              <div className="flex flex-col mb-2">
                <label
                  htmlFor=""
                  className="text-slate-300 pl-4 text-[0.6rem] sm:text-[0.8rem]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Deepak Singh"
                  className={`${formInputClass} ml-4 pl-0`}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label
                  htmlFor=""
                  className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                >
                  Contact
                </label>
                <input
                  type="number"
                  id="name"
                  placeholder="+91 9876543210"
                  className={`${formInputClass} pl-0`}
                />
              </div>
            </div>
            <div className="flex justify-center text-white">
              <ul className="items-center w-full sm:w-[70%] lg:w-[60%] flex pt-2 pb-2 ps-2 sm:ps-0">
                <li className="w-full border-slate-700 border-t-[0.5px] border-b-[0.5px]">
                  <div className="flex items-center ps-3 ">
                    <input
                      id="vue-checkbox-list"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="text-sm  p-4 pl-2 text-slate-400"
                    >
                      1st Owner
                    </label>
                  </div>
                </li>
                <li className="w-full border-t-[0.5px] border-b-[0.5px] border-slate-700">
                  <div className="flex items-center ps-3">
                    <input
                      id="vue-checkbox-list"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="text-sm p-4 pl-2 text-slate-400"
                    >
                      2nd Owner
                    </label>
                  </div>
                </li>
                <li className="w-full border-t-[0.5px] border-b-[0.5px] border-slate-700">
                  <div className="flex items-center ps-3">
                    <input
                      id="vue-checkbox-list"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="text-sm p-4 pl-2 text-slate-400"
                    >
                      3rd Owner
                    </label>
                  </div>
                </li>
                {/* Other list items */}
                {/* Repeat the structure for other checkboxes */}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Heading
              className="text-[0.9em] sm:text-md sm pb-0"
              title="Vehicle Details"
            />
            <div className="flex flex-col xl:flex-row mx-auto items-center justify-center">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Deepak Singh"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="BMW"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row ">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Model Year
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="2015"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    KMs Driven
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="32,000 KMs"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="City"
                    placeholder="New Delhi"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="150,000 Rs"
                    className={`${formInputClass} pl-0`}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mx-auto justify-center text-slate-300  text-[0.7rem] sm:text-[0.8rem] p2-4">
              <div className="sm:flex w-full sm:w-auto justify-center">
                <div className="p-2">
                  <label htmlFor="" className="">
                    Fuel Type
                  </label>
                  <div className="pt-2">
                    <select
                      name="fuelType"
                      id="fuelType"
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="cng">CNG</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="lpg">LPG</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <label htmlFor="">Transmission</label>
                  <div className="pt-2">
                    <select
                      name="fuelType"
                      id="fuelType"
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:flex w-full sm:w-auto justify-center">
                <div className="p-2">
                  <label htmlFor="">Body Type</label>
                  <div className="pt-2">
                    <select
                      name="fuelType"
                      id="fuelType"
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="sedan">Sedan</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="suv">SUV</option>
                      <option value="crossover">Crossover</option>
                      <option value="coupe">Coupe</option>
                      <option value="convertible">Convertible</option>
                      <option value="wagon">Wagon</option>
                      <option value="van">Van</option>
                      <option value="jeep">Jeep</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <label htmlFor="">Seats</label>
                  <div className="pt-2">
                    <select
                      name="fuelType"
                      id="fuelType"
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="two">2</option>
                      <option value="four">4</option>
                      <option value="five">5</option>
                      <option value="six">6</option>
                      <option value="seven">7</option>
                      <option value="eight">8</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-center space-x-2 items-center mt-4 w-full p-2 mb-4">
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <h2
                  className="text-sm md:text-[0.9em] text-center text-slate-400 font-semibold p-2 pl-0 pt-0"
                  title="Color"
                >
                  Color
                </h2>

                <div className="bg-white w-full bg-opacity-10 pb-4 rounded-lg">
                  <div className="flex justify-evenly">
                    <CirclePicker
                      colors={colors}
                      color={selectedColor}
                      onChange={handleColorChange}
                      className="rounded-lg pl-4 pr-4 pt-6 pb-0"
                    />
                  </div>
                  <div className="mx-auto flex text-sm font-extrabold pb-2">
                    {selectedColor && (
                      <p className={`mx-auto text-slate-400`}>
                        {" "}
                        {selectedColor}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 w-full md:auto">
                <h2
                  className="text-sm md:text-[0.9em] text-center  text-slate-400 font-semibold p-2 pl-0 pt-0"
                  title="Color"
                >
                  Description
                </h2>
                <div>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Description"
                    cols="60"
                    rows="5"
                    className="w-full border-[0.5px] border-slate-800 p-2 t-6 text-sm bg-white bg-opacity-10 outline-none rounded-lg text-slate-300 pl-2 pr-2 focus:border-slate-500 focus:border-[2px]"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-sm md:text-[0.9em] text-center text-slate-400 font-semibold p-2 pl-0 pt-0">
                Upload Image
              </h2>
              <div className="justify-start items-center">
                <div className="flex relative flex-col sm:flex-row justify-center h-24 items-center space-x-8 pt-0 p-4">
                  <div className="text-white">
                    <input
                      onChange={handleFileChange}
                      className="block rounded-md text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      multiple
                      type="file"
                      allow="image/*"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleImageUpload}
                      className={`text-slate-400 p-2 font-bold hover:text-slate-200 transition ease-in-out duration-300 text-[0.8rem]`}
                    >
                      {uploading ? <Uploader /> : "Upload"}
                    </button>
                  </div>
                  {uploadError.error && (
                    <p className="absolute text-red-500 bottom-0 text-[0.6rem] sm:text-[0.7rem]  mb-2">
                      {uploadError.message}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  {/* <h1 className="text-center text-slate-400 text-sm mb-2">
                    Preview
                  </h1> */}
                  <div className=" flex justify-center items-center">
                    <div className="p-4 pt-0 w-full flex flex-wrap justify-center text-white">
                      {formData.imageURls.length > 0 &&
                        formData.imageURls.map((url, index) => (
                          <ImagePreview
                            key={index}
                            url={url}
                            index={index}
                            RemovePreview={handleRemoveImagePreview}
                            galleryView={openPreview}
                          />
                        ))}
                      {previewImage && (
                        <ImagePreviewModal
                          imageUrl={previewImage}
                          onClose={closePreview}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
