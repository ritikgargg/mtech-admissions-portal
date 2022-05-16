import React, { useState } from "react";
import spinner from "../../images/SpinnerWhite.gif";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useForm } from "react-hook-form";
import { getAdminType } from "./AdminTypes";

const customStyles = {
  control: (base, state) => ({
    ...base,
    fontSize: "14px",
    lineHeight: "20px",
    borderRadius: "8px",
    padding: "5px",
    outline: state.isFocused ? "none" : "",
    border: "1px solid rgb(229 231 235)",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  }),
};

export default function AddTemplateCard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const { register, handleSubmit } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(0);
  const admin_type = getAdminType();

  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  const options = [
    { value: "application_id", label: "Application ID" },
    { value: "full_name", label: "Full Name" },
    { value: "fathers_name", label: "Father's Name" },
    { value: "email_id", label: "Email Address" },
    { value: "profile_image_url", label: "Profile Image" },
    { value: "date_of_birth", label: "Date of Birth" },
    { value: "aadhar_card_number", label: "Aadhar Card Number" },
    { value: "category", label: "Category" },
    { value: "category_certificate_url", label: "Category Certificate" },
    { value: "is_pwd", label: "Belongs to PWD" },
    { value: "marital_status", label: "Marital Status" },
    { value: "nationality", label: "Nationality" },
    { value: "gender", label: "Gender" },

    {
      value:
        "communication_address communication_city communication_state communication_pincode",
      label: "Communication Address",
    },
    {
      value:
        "permanent_address permanent_city permanent_state permanent_pincode",
      label: "Permanent Address",
    },
    { value: "mobile_number", label: "Mobile Number" },
    { value: "alternate_mobile_number", label: "Alternate Mobile Number" },
    {
      value:
        "degree_10th board_10th percentage_cgpa_format_10th percentage_cgpa_value_10th year_of_passing_10th remarks_10th marksheet_10th_url",
      label: "Educational Details: 10th",
    },
    {
      value:
        "degree_12th board_12th percentage_cgpa_format_12th percentage_cgpa_value_12th year_of_passing_12th remarks_12th marksheet_12th_url",
      label: "Educational Details: 12th",
    },
    { value: "degrees", label: "Educational Details: College" },
    { value: "other_remarks", label: "Educational Remarks" },
    {
      value: "is_last_degree_completed",
      label: "Last Degree Completion Status",
    },
    { value: "qualifying_examination", label: "Qualifying Exmaination" },
    { value: "branch_code", label: "Branch Code" },
    { value: "year", label: "GATE Examination Year" },
    { value: "gate_enrollment_number", label: "GATE Enrollment Number" },
    { value: "coap_registeration_number", label: "COAP Registration Number" },
    { value: "all_india_rank", label: "All India Rank" },
    { value: "gate_score", label: "GATE Score" },
    { value: "valid_upto", label: "Valid Upto" },
    {
      value: "self_attested_copies_url",
      label: "Self Attested Copies of GATE",
    },
    { value: "remarks", label: "Qualifying Exam Remarks" },
    { value: "amount", label: "Amount" },
    { value: "transaction_id", label: "Transaction ID" },
    { value: "bank", label: "Bank" },
    { value: "transaction_slip_url", label: "Transaction Slip" },
    { value: "date_of_transaction", label: "Date of Transaction" },
    { value: "signature_url", label: "Signature" },
    { value: "date_of_declaration", label: "Date of Declaration" },
    { value: "place_of_declaration", label: "Place of Declaration" },
    { value: "status", label: "Status" },
    { value: "status_remark", label: "Status Remarks" },
  ];

  const onSubmit = (data) => {
    setIsLoading(true);

    let column_list = [];
    let isDegree = false;
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].label === "Educational Details: College") {
        isDegree = true;
        continue;
      }
      const temp = selectedOptions[i].value.split(" ");
      for (let j = 0; j < temp.length; j++) {
        column_list.push(temp[j]);
      }
    }
    if (isDegree) column_list.push("degrees");
    let column_list_compact = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      column_list_compact.push(selectedOptions[i].label);
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("scope", data.scope);
    formData.append("column_list", JSON.stringify(column_list));
    formData.append("column_list_compact", JSON.stringify(column_list_compact));

    Axios.post("/add-template", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else if (response.data === 2) {
          setError(1);
          setIsLoading(false);
        } else {
          setError(0);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg relative">
        <div className="p-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pb-6 pt-2 mb-0 space-y-4 "
          >
            <div className="flex">
              <p className="text-lg font-medium">New Template</p>
              <button
                type="button"
                onClick={() => props.setIsAddingTemplate(false)}
                className="text-gray-400 bg-gray-100 focus:outline-none bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  onChange={() => setError(0)}
                  className={
                    error === 1
                      ? "w-full p-3 pr-12 text-sm border-red-200 rounded-lg shadow-sm"
                      : "w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  }
                  required
                />
                {error === 1 ? (
                  <p className="pl-1 pt-1 text-red-500 text-sm">
                    A template with the given name already exists in the same
                    scope
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="type" className="text-sm font-medium">
                Type
              </label>
              <select
                id="type"
                {...register("type")}
                required
                className="mt-1 w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              >
                <option value="">- Select -</option>
                <option value="APPLICANT LIST">APPLICANT LIST</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="text-sm font-medium">
                Scope
              </label>
              <select
                id="type"
                {...register("scope")}
                required
                className="mt-1 w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              >
                <option value="">- Select -</option>
                {admin_type === "0" && <option value="GLOBAL">GLOBAL</option>}
                <option value="PERSONAL">PERSONAL</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Select Columns</label>
              <div className="h-1" />
              <Select
                styles={customStyles}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti={true}
                options={options}
                onChange={handleChange}
              />
            </div>

            {!isLoading ? (
              <button
                type="submit"
                className="block w-full bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 focus:outline-none px-5 py-3 text-sm font-medium text-white rounded-lg"
              >
                <p>Add template</p>
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="block w-full bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 focus:outline-none px-5 py-3 text-sm font-medium text-white rounded-lg"
              >
                <img className="h-5 w-5 mx-auto" alt="spinner" src={spinner} />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
