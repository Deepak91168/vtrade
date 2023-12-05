import { MutatingDots } from "react-loader-spinner";
const Uploader = () => {
  return (
    <MutatingDots
      height="80"
      width="80"
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
