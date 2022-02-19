import React, { useState } from "react";
import DatePicker from "./DatePicker";
import { CountryDropdown } from "react-country-region-selector";

function PersonalInfo(props) {
  const [country, setCountry] = useState("");

  return (
    <div>
      <div className="px-6 py-6 mx-20 my-20 bg-[#f3f4f6] rounded-2xl">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                Personal Details
              </h3>
              <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                Please share your personal information.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name<span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Father's Name
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="date-of-birth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <DatePicker />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="aadhar-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Aadhar Card Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        name="aadhar-number"
                        id="aadhar-number"
                        autoComplete="aadhar"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category<span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        autoComplete="category"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Select Category</option>
                        <option>GEN</option>
                        <option>GEN-EWS</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="user_avatar"
                      >
                        Category Certificate (SC/ST/OBC/PwD/EWS)
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                      />
                      <div
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="user_avatar_help"
                      >
                        Files must be less than 2 MB.
                      </div>
                      <div
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="user_avatar_help"
                      >
                        Allowed file types: jpg jpeg png.
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="pwd-category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Whether belongs to PWD category
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <select
                        id="pwd-category"
                        name="pwd-category"
                        autoComplete="pwd-category"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Select Choice</option>
                        <option>YES</option>
                        <option>NO</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="marital-status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Marital Status
                      </label>
                      <select
                        id="marital-status"
                        name="marital-status"
                        autoComplete="marital-status"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Select Status</option>
                        <option>Unmarried</option>
                        <option>Married</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="nationality"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nationality
                      </label>
                      <CountryDropdown
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={country}
                        onChange={(val) => setCountry(val)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender<span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        autoComplete="gender"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={()=>props.increasePageNumber()}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
