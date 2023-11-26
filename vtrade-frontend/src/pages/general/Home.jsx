import React from "react";
import { ModelCanvas } from "../../components/three/ModelCanvas";
import { useEffect, useState } from "react";

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
            <p className="transition-all ease-in-out duration-300 top-[50%] left-[50%] translate-x-[-50%] translate-y-[19rem] text-right absolute bg-white bg-opacity-10 hover:cursor-default rounded-lg text-slate-300 p-4 text-[0.6rem] font-semibold">
              Click! and move to play with model
            </p>
          )}

          <div className="text-white">New Div</div>
        </div>
      </div>
      <ModelCanvas />
    </div>
  );
};
