import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
const ImagePreview = ({ url, index, RemovePreview, galleryView }) => {
  return (
    <div key={index} className="relative p-2">
      <img
        src={url}
        alt="Vehicle"
        onClick={() => galleryView(url)}
        className="transition ease-in-out duration-300 h-32 w-32 sm:h-48 hover:opacity-75 cursor-pointer clear-both sm:w-48 object-cover"
      />
      <motion.button
        whileHover={{
          rotate: 90,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        type="button"
        onClick={() => RemovePreview(index)}
        className="absolute z-10 top-0 right-0 transition ease-in-out duration-300 bg-slate-800 hover:bg-black p-2 cursor-pointer rounded-full"
      >
        <div>
          <RxCross2 className="text-white text-sm" />
        </div>
      </motion.button>
    </div>
  );
};

export default ImagePreview;
