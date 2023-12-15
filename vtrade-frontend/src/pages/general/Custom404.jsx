import React from "react";

const Custom404 = () => {
  return (
    <div className="text-center mt-48 text-white">
      <div className="bg-slate-700 p-6">
        <h1 className=" font-bold text-3xl">404</h1>
        <h2 className="text-red-500 font-bold">Page Not Found !</h2>
      </div>
      <p className="mt-6">
        Sorry, the page you&lsquo;re looking for doesn&lsquo;t exist.
      </p>

      <p className="mt-10">
        Try our
        <a href="/" className="text-slate-400 underline pl-1">
          Homepage
        </a>
        ?
      </p>
    </div>
  );
};

export default Custom404;
