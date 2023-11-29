import React from "react";
import Heading from "../../components/ui/Heading";
import { formInputClass } from "../../assets/styles/commonClasses";
// name
//       Brand -
//       city -
//       modelYear -
//       regularPrice -
//       description
//       fuelType-
//       transmission-
//       color
//       seats -
//       bodyType-
//       ownerName -
//       owner -
//       kmsDriven -
//       imageUrls
//       features

const AddVehicle = () => {
  return (
    <div className="mt-8">
      <div>
        <Heading title="Add Vehicle for Sell" />
        <div className="w-full flex item-center justify-center">
          <hr className="text-slate-600 border-slate-600 w-20 lg:w-40 border-[0.5px] sm:border-[2px]" />
        </div>
      </div>
      <div className="max-w-5xl mx-2 sm:mx-auto">
        <form className="mt-4 text-white" action="">
          <div>
            <Heading className="text-[0.6rem]" title="Owner" />
            <div className="flex space-x-4  items-center justify-center m-4 mb-0 sm:mx-auto mt-0">
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
                  className="text-slate-300 pl-4 text-[0.6rem] sm:text-[0.8rem]"
                >
                  Contact
                </label>
                <input
                  type="number"
                  id="name"
                  placeholder="+91 9876543210"
                  className={`${formInputClass} ml-4 pl-0`}
                />
              </div>
            </div>
            <div className="flex justify-center text-white">
              <ul className="items-center w-full sm:w-[70%] lg:w-[60%] flex pt-2 pb-2 ps-2 sm:ps-0">
                <li className="w-full border-slate-500 border-t-2 border-b-2 dark:border-gray-600">
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
                <li className="w-full border-slate-500 border-t-2 border-b-2 dark:border-gray-600">
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
                <li className="w-full border-t-2 border-b-2 border-slate-500 dark:border-gray-600">
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
            <Heading className="text-[0.6rem]" title="Vehicle Details" />
            <div className="flex flex-col lg:flex-row mx-auto items-center justify-center">
              <div className="flex">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-0 sm:pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Deepak Singh"
                    className={`${formInputClass} ml-0 sm:ml-4 pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="BMW"
                    className={`${formInputClass} ml-4 pl-0`}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-0 sm:pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Model Year
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="2015"
                    className={`${formInputClass} ml-0 sm:ml-4 pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    KMs Driven
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="32,000 KMs"
                    className={`${formInputClass} ml-4 pl-0`}
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-col lg:flex-row items-center justify-center">
              <div className="flex">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-0 sm:pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="City"
                    placeholder="New Delhi"
                    className={`${formInputClass} ml-0 sm:ml-4 pl-0`}
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="text-slate-300 pl-4 text-[0.6rem] sm:text-[0.8rem]"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="name"
                    placeholder="150,000 Rs"
                    className={`${formInputClass} ml-4 pl-0`}
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
            <div>
              color
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
