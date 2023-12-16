import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>

      <footer
        className={`bg-slate-900 text-white py-4 border-slate-900 w-full fixed bottom-0 ${
          showFooter ? "block" : "hidden"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-slate-200 text-[0.8rem] sm:text-md">VTRADE</p>
            <div className="text-[8px] sm:text-[0.7rem] text-slate-200">
              All rights reserved &copy; {new Date().getFullYear()} VTRADE
            </div>
            <div className="flex space-x-1 text-sm sm:space-x-4">
              <a
                href="https://www.facebook.com/"
                className="text-white hover:text-gray-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/DEEPAKS23951255"
                className="text-white hover:text-gray-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/deepak__9116"
                className="text-white hover:text-gray-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/Deepak91168"
                className="text-white hover:text-gray-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
