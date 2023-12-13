import React from "react";
import { FaGithub } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
export const About = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-20 text-white flex justify-center">
      <div>
        <div className="pt-10">
          <h2 className="text-slate-400 text-lg text-center"> About</h2>
        </div>

        <div className="p-4 max-w-2xl flex  text-slate-300 m-6 text-sm border-slate-600 bg-black bg-opacity-20 backdrop-blur-md  border-[0.5px] rounded-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </div>
        <div className="justify-center">
          <div className="text-center text-[0.8rem] text-slate-400 mb-2">
            Source Code
          </div>
          <div className="flex justify-center p-2">
            <Link to="https://github.com/Deepak91168/vtrade" target="_blank">
              <FaGithub className="text-[2rem] transition ease-in-out cursor-pointer duration-500 hover:bg-slate-600 rounded-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
