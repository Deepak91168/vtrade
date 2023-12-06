import React from "react";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
const ImagePreviewModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
      <div className="max-w-screen-lg max-h-[90vh] object-contain relative overflow-auto">
        <div className="p-4 flex justify-center">
          <motion.button
            whileHover={{
              rotate: 90,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            type="button"
            onClick={onClose}
            className="absolute z-10 top-0 right-0 transition ease-in-out duration-300 bg-slate-800 hover:bg-black p-2 cursor-pointer rounded-full"
          >
            <div>
              <RxCross2 className="text-white text-sm" />
            </div>
          </motion.button>
          <img
            src={imageUrl}
            alt="Preview"
            className=" max-h-full max-w-full rounded-lg object-contain overflow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
