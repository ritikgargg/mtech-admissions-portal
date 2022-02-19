import React from "react";
import { Link } from "react-router-dom";

function SignUpStartPage() {
  return (
    <div>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-[#1E3A8A] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-[#6F8BD6] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="p-16 relative w-full rounded-3xl bg-gray-100 shadow-md">
            <label
              htmlFor
              className="block mt-3 text-2xl text-gray-700 text-center font-semibold"
            >
              Welcome to IIT Ropar
            </label>

            <p className="text-center mt-2 text-sm text-gray-500">
              Let's get started!
            </p>
            <p className="text-center mt-2 text-sm text-gray-500">
              Complete the registration to participate in campus admissions!
            </p>

            <div className="mt-10">
              <div className="mt-7">
                <Link to="/sign-up-form">
                  <button
                    type="button"
                    className="bg-[#1E3A8A] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Start Registering
                  </button>
                </Link>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Already have a account? </label>
                  <Link
                    to="/log-in"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Log-in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpStartPage;
