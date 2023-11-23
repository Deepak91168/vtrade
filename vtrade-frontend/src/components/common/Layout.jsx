// Layout.js
// style={{ backgroundImage: `url(${bgImage})` }}
import React from "react";
import bgImage from "../../assets/images/background.jpg";
const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-black opacity-60 "></div>
    </div>
  );
};

export default Layout;
