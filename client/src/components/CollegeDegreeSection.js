import React from "react";

function CollegeDegreeSection() {
  return (
    <div className="col-span-full sm:col-span-full">
      <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Degree<span style={{ color: "#ff0000" }}> *</span>
          </label>
          <select
            id="category"
            name="category"
            autoComplete="category"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>B.E.</option>
          </select>
        </div>

        <div className="col-span-8 sm:col-span-4">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Branch<span style={{ color: "#ff0000" }}> *</span>
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
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            University/Institute
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
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Year of Passing
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

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Percentage/CGPA
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <select
            id="category"
            name="category"
            autoComplete="category"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>- Select -</option>
            <option>Percentage</option>
            <option>CGPA</option>
          </select>
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Percentage/CGPA
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

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            CGPA Scale
          </label>
          <select
            id="category"
            name="category"
            autoComplete="category"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>- None -</option>
            <option></option>
            <option></option>
          </select>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            Remarks (if any)
          </label>
          <div className="mt-1">
            <textarea
              id="AddressForCommunication"
              name="AddressForCommunication"
              rows={2}
              className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="user_avatar"
          >
            Semester-wise marksheets/grade cards for graduation
            <span style={{ color: "#ff0000" }}> *</span>
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
            Files must be less than 5 MB.
          </div>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Allowed file types: pdf.
          </div>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="user_avatar"
          >
            Degree/Provisional Degree
            <span style={{ color: "#ff0000" }}> *</span>
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
            Files must be less than 5 MB.
          </div>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Allowed file types: pdf.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDegreeSection;
