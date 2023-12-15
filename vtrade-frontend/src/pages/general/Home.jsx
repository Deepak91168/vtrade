import React from "react";
import { ModelCanvas } from "../../components/three/ModelCanvas";
import { useEffect, useState } from "react";
import MovingComponent from "react-moving-text";
import { Link } from "react-router-dom";
export const Home = () => {
  const [modelNotification, setModelNotification] = useState(false);

  useEffect(() => {
    handleModelNotification();
  }, []);

  const handleModelNotification = () => {
    showModelNotification();
    clearModelNotification();
  };

  const showModelNotification = () => {
    setTimeout(() => {
      setModelNotification(true);
    }, 5000);
  };

  const clearModelNotification = () => {
    setTimeout(() => {
      setModelNotification(false);
    }, 12000);
  };
  return (
    <div className="relative">
      <div className="absolute w-full text-white z-10">
        <div className="">
          {modelNotification && (
            <MovingComponent
              type="fadeOut"
              duration="2000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
              className="transition-all ease-in-out duration-300 top-[50%] left-[50%] translate-x-[-50%] translate-y-[19rem] text-right absolute bg-black bg-opacity-60 hover:cursor-default rounded-lg text-slate-300 p-4 text-[0.6rem] font-semibold"
            >
              Click! and move to play with model
            </MovingComponent>
          )}

          <div className="text-white flex justify-around p-4">
            <div className="mt-40 sm:mt-40 bg-transparent p-4 ">
              <p className="text-xl font-bold text-slate-500 pb-4 ">
                Shift Gears: Your Journey Starts Here, Buying or Selling.
              </p>
              <div className="">
                <MovingComponent
                  type="fadeIn"
                  duration="1800ms"
                  delay="0s"
                  direction="normal"
                  timing="ease-in"
                  iteration="1"
                  fillMode="forwards"
                  className="text-2xl font-bold text-slate-300"
                >
                  VTRADE
                </MovingComponent>
                <p className="text-slate-300 mt-2">
                  Vehicle Transactions, Replacements, and Deals for Everyone
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to={"/buy-vehicle"}
                  className="text-slate-300 text-sm bg-slate-700 border-slate-700 border-[0.5px]  p-2 px-4 rounded-md hover:bg-transparent transition ease-in-out duration-300"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModelCanvas />
    </div>
  );
};
