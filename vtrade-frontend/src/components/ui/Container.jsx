import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-2xl px-6 rounded-md p-4 mx-auto pt-20">
      {children}
    </div>
  );
};

export default Container;
