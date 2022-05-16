import React from "react";
import success from "../../images/success.gif";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <div className="mb-10 w-full justify-center content-center text-center">
      <img className="mx-auto" alt="Success-GIF" src={success} />
      <p className="font-[Helvetica] font-medium text-2xl">
        Your application has been successfully submitted
      </p>
      <button
        type="button"
        className="font-[Helvetica] transition mt-10 ease-in-out delay-150 hover:scale-110 duration-300 inline-flex justify-center pt-2 pb-2 px-8 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
        onClick={() => navigate("/my-applications")}
      >
        Continue
      </button>
    </div>
  );
}

export default Success;
