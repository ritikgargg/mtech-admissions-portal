import React from "react";

function CollegeDegreeSection(props) {
  return (
    <div className="col-span-full sm:col-span-full">
      <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-700"
          >
            Degree<span style={{ color: "#ff0000" }}> *</span>
          </label>
          <select
            id="degree"
            name="degree"
            onChange={(event) => props.handleChange(props.id,0,event)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>B.E.</option>
            <option>BTech</option>
          </select>
        </div>

        <div className="col-span-8 sm:col-span-4">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Branch<span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            type="text"
            name="branch"
            id="branch"
            onChange={(event) => props.handleChange(props.id,1,event)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="university"
            className="block text-sm font-medium text-gray-700"
          >
            University/Institute
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            type="text"
            name="university"
            id="university"
            onChange={(event) => props.handleChange(props.id,2,event)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="year-of-passing"
            className="block text-sm font-medium text-gray-700"
          >
            Year of Passing
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            type="text"
            name="year-of-passing"
            id="year-of-passing"
            onChange={(event) => props.handleChange(props.id,3,event)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="percentage-cgpa-format"
            className="block text-sm font-medium text-gray-700"
          >
            Percentage/CGPA
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <select
            id="percentage-cgpa-format"
            name="percentage-cgpa-format"
            onChange={(event) => props.handleChange(props.id,4,event)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>- Select -</option>
            <option>Percentage</option>
            <option>CGPA</option>
          </select>
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="percentage-cgpa-value"
            className="block text-sm font-medium text-gray-700"
          >
            Percentage/CGPA
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            type="text"
            name="percentage-cgpa-value"
            id="percentage-cgpa-value"
            onChange={(event) => props.handleChange(props.id,5,event)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-4 sm:col-span-2">
          <label
            htmlFor="cgpa-scale"
            className="block text-sm font-medium text-gray-700"
          >
            CGPA Scale
          </label>
          <select
            id="cgpa-scale"
            name="cgpa-scale"
            onChange={(event) => props.handleChange(props.id,6,event)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>- None -</option>
            <option>10</option>
            <option>4</option>
          </select>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-gray-700"
          >
            Remarks (if any)
          </label>
          <div className="mt-1">
            <textarea
              id="remarks"
              name="remarks"
              onChange={(event) => props.handleChange(props.id,7,event)}
              rows={2}
              className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="marksheet"
          >
            Semester-wise marksheets/grade cards for graduation
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="marksheet_help"
            id="marksheet"
            type="file"
            onChange={(e) => props.handleFileSubmit(e, 2, props.id,8)}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="marksheet_help"
          >
            Files must be less than 5 MB.
          </div>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="marksheet_help"
          >
            Allowed file types: pdf.
          </div>
        </div>

        <div className="col-span-full sm:col-span-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="provisional_degree"
          >
            Degree/Provisional Degree
            <span style={{ color: "#ff0000" }}> *</span>
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="provisional_degree_help"
            id="provisional_degree"
            type="file"
            onChange={(e) => props.handleFileSubmit(e, 2, props.id,9)}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="provisional_degree_help"
          >
            Files must be less than 5 MB.
          </div>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="provisional_degree_help"
          >
            Allowed file types: pdf.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDegreeSection;
