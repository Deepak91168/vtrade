import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";

const ContactOwner = ({ vehicle }) => {
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState("");
  const handleOnChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  useEffect(() => {
    const getOwner = async () => {
      try {
        const res = await axios.get(
          `/api/user/${vehicle.userRef}`,
          { withCredentials: true } //? Never Forget this
        );
        setOwner(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOwner();
  }, [vehicle.userRef]);
  return (
    <div className="mb-[64px]">
      {owner && (
        <>
          <div className="p-4 flex justify-center space-x-2 mx-2 text-sm bg-slate-700 bg-opacity-40 rounded-lg">
            <div className="flex justify-center items-center text-[0.7rem]">
              <div className="bg-slate-600 p-[6px] rounded-full mr-1">
                <IoCall className=" text-slate-100" />
              </div>
              <p className="text-slate-400">{vehicle.ownerContact}</p>
            </div>
          </div>
          <p className="pl-4 font-bold text-slate-400 mt-4 p-4">
            Write message to owner
          </p>
          <p className="pl-4 text-[0.7rem]">
            Contact{" "}
            <span className="font-bold text-slate-400">{owner.name}</span> for{" "}
            <span className="font-bold text-slate-400">
              {vehicle.vehicleName}
            </span>
          </p>
          <form className="p-4 flex flex-col justify-center w-full">
            <textarea
              type="text"
              id="message"
              placeholder="Your message"
              rows="4"
              value={message}
              onChange={handleOnChange}
              className="w-full border-[0.5px] border-slate-800 p-2 transition ease-in-out duration-300 text-sm hover:border-slate-700 bg-slate-800 bg-opacity-40 outline-none rounded-lg text-slate-300 focus:border-slate-500 focus:border-[0.5px]"
            />
            <div className="flex justify-center">
              <Link
                to={`mailto:${owner.email}?subject=${vehicle.vehicleName}%20Inquiry&body=${message}`}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 text-center transition ease-in-out bg-slate-800 duration-500 rounded-lg border-slate-800 text-white w-[20%] pt-3 pb-3 border-[1px] text-[0.7rem] hover:border-slate-600 hover:bg-transparent`}
              >
                Send
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactOwner;
