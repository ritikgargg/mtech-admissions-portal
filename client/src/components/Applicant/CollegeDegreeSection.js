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
            required
            onChange={(event) => {props.handleChange(props.id,0,event);}}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">- Select -</option>
            <option value="B.E.">B.E.</option>
            <option value="B-Tech">B-Tech</option>
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
            required
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
            required
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
            pattern="[1-9]{1}[0-9]{3}"
            title="4 Digit Year (Example: 2020)"
            id="year-of-passing"
            required
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
            onChange={(event) => {props.handleChange(props.id,4,event); props.handleSelectChange(event, props.id+2)}}
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">- Select -</option>
            <option value="Percentage">Percentage</option>
            <option value="CGPA">CGPA</option>
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
            required
            pattern={props.percentage_cgpa_pattern[props.id+2]}
            title="Correct Format Percentage: 94.65, Correct Format CGPA: (8.23 if scale is 10), (3.45 if scale is 4)"
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
            required
            onChange={(event) => {props.handleChange(props.id,6,event);props.handleSelectChange(event, props.id+2)}}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">- None -</option>
            <option value="10">10</option>
            <option value="4">4</option>
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
            accept=".pdf"
            required
            onChange={(e) => props.handleFileSubmit(e, 2, props.id,8)}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="marksheet_help"
          >
            {/* Files must be less than 5 MB., Allowed file types: pdf. */}
            <span className="font-semibold">Maximum file size:</span> 5 MB <span className="font-semibold">Allowed file formats:</span> .pdf
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="profile-picture-desc">
            <span className="font-semibold">File Name Format:</span> 
            <span> Marksheet{props.id}_&lt;your_email_id&gt; For Example: Marksheet{props.id}_abc@gmail.com</span>
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
            accept=".pdf"
            required
            onChange={(e) => props.handleFileSubmit(e, 2, props.id,9)}
          />
              <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="marksheet_help"
          >
            {/* Files must be less than 5 MB., Allowed file types: pdf. */}
            <span className="font-semibold">Maximum file size:</span> 5 MB <span className="font-semibold">Allowed file formats:</span> .pdf
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="profile-picture-desc">
            <span className="font-semibold">File Name Format:</span> 
            <span> Degree{props.id}_&lt;your_email_id&gt; For Example: Degree{props.id}_abc@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDegreeSection;
