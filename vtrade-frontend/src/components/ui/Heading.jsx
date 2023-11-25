import React from "react";

const Heading = ({ title, className }) => {
  return (
    <h1
      className={`text-slate-400 cursor-default text-xl text-center mb-4 font-extrabold pb-4 ${className}`}
    >
      <span color="text ">{title}</span>
    </h1>
  );
};

export default Heading;
