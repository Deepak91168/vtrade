import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="w-full relative">
      <div className="">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className=" rounded-lg object-cover w-full h-full sm:h-72 cursor-pointer"
        />
      </div>
      <div className=" absolute left-1/2 transform -translate-x-1/2 bottom-1">
        <button
          name="arrow-left"
          className="bg-slate-900 p-2 mr-2 transition ease-in-out duration-300 hover:bg-slate-700  rounded-full"
          onClick={prevSlide}
        >
          <FaArrowLeft className="text-white text-[0.7rem]" />
        </button>
        <button
          name="arrow-right"
          className="bg-slate-900 p-2 mr-2 transition ease-in-out duration-300  rounded-full hover:bg-slate-700"
          onClick={nextSlide}
        >
          <FaArrowRight className="text-white text-[0.7rem]" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
