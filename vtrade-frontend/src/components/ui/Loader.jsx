import { LineWave } from "react-loader-spinner";
export const Loader = ({ className }) => {
  return (
    <div className={`w-full flex justify-center items-center + ${className}`}>
      <LineWave
        className="text-center"
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor="#4e4d4f"
        middleLineColor="#4e4d4f"
        lastLineColor="#4e4d4f"
      />
    </div>
  );
};
