import { useState, useEffect } from "react";
import Heading from "../../components/ui/Heading";
import { CirclePicker } from "react-color";
import { formInputClass } from "../../assets/styles/commonClasses";
import VehicleColorMap from "../../utils/ColorMap";
import { getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getRandomFileName, getRandomValue } from "../../utils/RandomName";
import ImagePreview from "../../components/form/ImagePreview";
import Uploader from "../../components/form/Uploader";
import ImagePreviewModal from "../../components/ui/ImagePreviewModal";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader } from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditVehicleDetails = () => {
  const params = useParams();
  const currentUser = useSelector((state) => state.user);
  const ownerType = ["1st Owner", "2nd Owner", "3rd Owner"];
  const [imageFile, setImageFile] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedOwnerType, setSelectedOwnerType] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading the form
  const navigate = useNavigate();
  const [uploadError, setUploadError] = useState({
    error: false,
    message: "",
  });
  const colors = ["Silver", "Black", "white", "Red", "Blue", "Grey", "Brown"]; // Seven colors
  const [formData, setFormData] = useState({
    bodyType: "Sedan",
    brand: "",
    city: "",
    color: selectedColor,
    fuelType: "Petrol",
    imageURls: [],
    kmsDriven: "",
    modelYear: "",
    offer: false,
    ownerName: "",
    ownerContact: "",
    ownerType: "",
    priceDiscounted: "",
    priceRegular: "",
    seats: 2,
    transmission: "Automatic",
    vehicleName: "",
    description: "",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `/api/vehicle/get-vehicle/${params.vehicleID}`,
          {
            withCredentials: true,
          }
        );
        const vehicle = response.data;
        setFormData({
          bodyType: vehicle.bodyType,
          brand: vehicle.brand,
          city: vehicle.city,
          color: vehicle.color,
          fuelType: vehicle.fuelType,
          imageURls: vehicle.imageURls,
          kmsDriven: vehicle.kmsDriven,
          modelYear: vehicle.modelYear,
          offer: vehicle.offer,
          ownerName: vehicle.ownerName,
          ownerContact: vehicle.ownerContact,
          ownerType: vehicle.ownerType,
          priceDiscounted: vehicle.priceDiscounted,
          priceRegular: vehicle.priceRegular,
          seats: vehicle.seats,
          transmission: vehicle.transmission,
          vehicleName: vehicle.vehicleName,
          description: vehicle.description,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchVehicle();
  }, [params.vehicleID]);

  const handleColorChange = (color) => {
    const colorName = color.hex;
    setSelectedColor(VehicleColorMap[colorName]);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      color: selectedColor,
      ownerType: ownerType[selectedOwnerType],
    });
  }, [selectedColor, selectedOwnerType]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files);
  };

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
          // console.log(`Upload is ${progress}% done`);
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
        setUploading(false);
        setUploadError({
          error: true,
          message: error.message,
        });
      }
    } else {
      setUploading(false);
      clearFileField();
      setUploadError({
        error: true,
        message: "Max 8 images are allowed!",
      });
    }
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

  const handleFormDataChange = (e) => {
    const { id, value } = e.target;
    if (id === "offer") {
      setFormData({
        ...formData,
        [id]: e.target.checked,
      });
      return;
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleOwnerTypeChange = (i) => {
    setSelectedOwnerType((prev) => {
      if (prev === i) {
        return null;
      }
      return i;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(Object.keys(currentUser.currentUser));
      setLoading(true);
      if (formData.offer && formData.priceDiscounted >= formData.priceRegular) {
        toast.error("Discounted Price should be less than Regular Price");
        setLoading(false);
        return;
      }
      if (formData.imageURls.length === 0) {
        toast.error("Please upload Atleast one image!");
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await axios.put(
        `/api/vehicle/update/${params.vehicleID}`,
        {
          ...formData,
          userRef: currentUser.currentUser._id,
        },
        { withCredentials: true }
      );
      setLoading(false);
      const data = res.data;
      toast.success("Vehicle Added Successfully!");
      navigate(`/vehicle/${data._id}`);
    } catch (error) {
      toast.error("All fields are required!");
      setLoading(false);
    }
  };
  return (
    <div className="mt-8">
      <div>
        <Heading
          title="Edit Details"
          className="pb-0 mb-[1px] text-[0.8em] sm:text-[1.2em]"
        />
        <div className="w-full flex item-center justify-center">
          <hr className="text-slate-600 border-slate-600 w-20 lg:w-40 border-[0.5px] sm:border-[2px]" />
        </div>
      </div>
      <div className="max-w-5xl mx-2 sm:mx-auto">
        <form className="mt-2 text-white" action="">
          <div className="">
            <Heading
              className="text-[0.8em] sm:text-[1.2em] pb-0"
              title="Owner"
            />
            <div className="flex flex-col md:flex-row justify-center ps-4">
              <div className="flex flex-col mb-2">
                <label
                  htmlFor=""
                  className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="ownerName"
                  placeholder="Deepak Singh"
                  className={`${formInputClass} pl-0`}
                  onChange={handleFormDataChange}
                  value={formData.ownerName}
                  required
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
                  id="ownerContact"
                  placeholder="+91 9876543210"
                  className={`${formInputClass} pl-0`}
                  onChange={handleFormDataChange}
                  value={formData.ownerContact}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center text-white">
              <ul className="items-center w-full sm:w-[70%] lg:w-[60%] flex pt-2 pb-2 ps-2 sm:ps-0">
                {ownerType.map((owner, index) => (
                  <li
                    key={index}
                    className="w-full border-slate-700 border-t-[0.5px] border-b-[0.5px]"
                  >
                    <div className="flex items-center ps-3 ">
                      <input
                        // id="1stOwner"
                        type="checkbox"
                        checked={
                          index === selectedOwnerType ||
                          formData.ownerType === owner
                        }
                        onChange={() => handleOwnerTypeChange(index)}
                        className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="vue-checkbox-list"
                        className="text-sm  p-4 pl-2 text-slate-400"
                      >
                        {owner}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Heading
              className="text-[0.8em] sm:text-[1.2em] sm pb-0"
              title="Vehicle Details"
            />
            <div className="flex flex-col xl:flex-row mx-auto items-center justify-center">
              <div className="flex flex-col md:flex-row w-full justify-center ps-4">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    id="vehicleName"
                    placeholder="Deepak Singh"
                    className={`${formInputClass} pl-0`}
                    value={formData.vehicleName}
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Model Year
                  </label>
                  <input
                    type="number"
                    id="modelYear"
                    placeholder="2021"
                    className={`${formInputClass} pl-0`}
                    value={formData.modelYear}
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full justify-center ps-4">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="New Delhi"
                    className={`${formInputClass} pl-0`}
                    value={formData.city}
                    onChange={handleFormDataChange}
                    required
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
                    id="priceRegular"
                    placeholder="150,000 Rs"
                    className={`${formInputClass} pl-0`}
                    value={formData.priceRegular}
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full justify-center ps-4">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    placeholder="BMW"
                    className={`${formInputClass} pl-0`}
                    value={formData.brand}
                    onChange={handleFormDataChange}
                    required
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
                    id="kmsDriven"
                    placeholder="20,000 KMs"
                    className={`${formInputClass} pl-0`}
                    value={formData.kmsDriven}
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex mt-4 relative pb-6 sm:mb-4 flex-col sm:flex-row justify-center items-center">
              <div className="flex">
                <div className=" flex">
                  <input
                    id="offer"
                    type="checkbox"
                    checked={formData.offer}
                    onChange={handleFormDataChange}
                    className=" sm:mt-0 cursor-pointer"
                  />
                </div>
                <label htmlFor="" className="text-sm pl-2 text-slate-400 p-2">
                  Offer
                </label>
              </div>
              {formData.offer && (
                <motion.div
                  animate={{ x: 5 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className=""
                >
                  <input
                    type="number"
                    id="priceDiscounted"
                    placeholder="Discounted Price"
                    className={`${formInputClass}`}
                    value={formData.priceDiscounted}
                    onChange={handleFormDataChange}
                  />
                </motion.div>
              )}

              <div className="absolute text-[0.6rem] text-slate-400 bottom-0">
                Discounted Price should be less than Regular Price
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
                      required
                      name="fuelType"
                      id="fuelType"
                      value={formData.fuelType}
                      onChange={handleFormDataChange}
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="LPG">LPG</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <label htmlFor="">Transmission</label>
                  <div className="pt-2">
                    <select
                      required
                      name="transmission"
                      id="transmission"
                      value={formData.transmission}
                      onChange={handleFormDataChange}
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:flex w-full sm:w-auto justify-center">
                <div className="p-2">
                  <label htmlFor="">Body Type</label>
                  <div className="pt-2">
                    <select
                      required
                      name="bodyType"
                      id="bodyType"
                      value={formData.bodyType}
                      onChange={handleFormDataChange}
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="SUV">SUV</option>
                      <option value="Crossover">Crossover</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Wagon">Wagon</option>
                      <option value="Van">Van</option>
                      <option value="Jeep">Jeep</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <label htmlFor="">Seats</label>
                  <div className="pt-2">
                    <select
                      name="seats"
                      id="seats"
                      required
                      value={formData.seats}
                      onChange={handleFormDataChange}
                      className="w-full sm:w-[10rem] h-8 bg-transparent border border-slate-500 rounded text-slate-300 pl-2 pr-2"
                    >
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-center space-x-2 items-center mt-4 w-full p-2 mb-4">
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <h2
                  className="text-[0.6em] sm:text-[0.8em] text-center text-slate-400 font-semibold p-2 pl-0 pt-0"
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
                      value={formData.color}
                      className="rounded-lg pl-4 pr-4 pt-6 pb-0"
                    />
                  </div>
                  <div className="mx-auto flex text-sm font-extrabold pb-2">
                    {formData.color && (
                      <p className={`mx-auto text-slate-400`}>
                        {formData.color}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 w-full md:auto">
                <h2
                  className="text-[0.6em] sm:text-[0.8em] text-center  text-slate-400 font-semibold p-2 pl-0 pt-0"
                  title="Color"
                >
                  Description
                </h2>
                <div>
                  <textarea
                    required
                    name="description"
                    id="description"
                    onChange={handleFormDataChange}
                    value={formData.description}
                    placeholder="Description"
                    cols="60"
                    rows="5"
                    className="w-full border-[0.5px] border-slate-800 p-2 t-6 text-sm bg-white bg-opacity-10 outline-none rounded-lg text-slate-300 pl-2 pr-2 focus:border-slate-500 focus:border-[2px]"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-[0.6em] sm:text-[0.8em] text-center text-slate-400 font-semibold p-2 pl-0 pt-0">
                Upload Image
              </h2>
              <div className="justify-start items-center">
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-8">
                  <div className="text-white">
                    <input
                      onChange={handleFileChange}
                      className="block rounded-md text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      multiple
                      type="file"
                      allow="image/*"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleImageUpload}
                      className={`text-white pr-4 mb-2 pl-4 p-2 text-center font-bold hover:text-slate-200 transition ease-in-out duration-300 hover:bg-transparent border-slate-500 bg-slate-700 border-[0.5px] mt-2 rounded-md text-[0.5em] sm:text-[0.6em]`}
                    >
                      {uploading ? <Uploader /> : "Upload"}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">
                    {uploadError.message && (
                      <p className=" text-red-500 text-[0.6rem] sm:text-[0.7rem]  mb-2">
                        {uploadError.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  {/* <h1 className="text-center text-slate-400 text-sm mb-2">
                    Preview
                  </h1> */}
                  <div className="pb-2 flex justify-center items-center">
                    <div className="w-full flex flex-wrap justify-center text-white">
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
            <div className="flex justify-center mb-[80px]">
              {loading ? (
                <Loader className={` mt-0 items-start mb-4`} />
              ) : (
                <button
                  className={`transition ease-in-out bg-slate-800 duration-500 rounded-lg border-slate-800 text-white w-[20%] pt-4 pb-4 border-[2px] text-[0.7rem] hover:border-slate-600 hover:bg-transparent`}
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleDetails;
