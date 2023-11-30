import React from "react";
import { MutatingDots } from "react-loader-spinner";
const Uploader = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#4e4d4f"
      secondaryColor="#C0C2C9"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Uploader;
