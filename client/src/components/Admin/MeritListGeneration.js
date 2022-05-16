import React, { useState, useEffect } from "react";
import fileSaver from "file-saver";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import spinner from "../../images/SpinnerWhite.gif";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from "react-hook-form";

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

export default function MeritListGeneration(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const { register, handleSubmit } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  const initOptions = (dataList) => {
    let temp = [];
    for (let i = 0; i < dataList.length; i++) {
      temp.push({ value: dataList[i], label: dataList[i] });
    }
    return temp;
  };
  useEffect(() => {
    Axios.get("/get-applicants-branches", {
      headers: {
        Authorization: getToken(),
        cycle_id: props.cycle_id,
        offering_id: props.offering_id,
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setOptions(initOptions(response.data));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function onSubmit() {
    setIsLoading(true);

    const formData = new FormData();
    let filteredOptions = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      filteredOptions.push(selectedOptions[i].value);
    }

    formData.append("eligible_branches", JSON.stringify(filteredOptions));
    Axios.post("/get-merit-list", formData, {
      responseType: "arraybuffer",
      headers: {
        Authorization: getToken(),
        cycle_id: props.cycle_id,
        offering_id: props.offering_id,
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          var blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          let fileName =
            "Merit_List_" + props.offeringName + "_" + props.cycleName;
          fileSaver.saveAs(blob, fileName);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg relative">
        <div className="p-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pb-6 pt-2 mb-0 space-y-4 "
          >
            <div className="flex">
              <p className="text-lg font-medium">Generate Merit List</p>
              <button
                type="button"
                onClick={() => props.setIsGeneratingMeritList(false)}
                className="text-gray-400 focus:outline-none bg-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <label className="text-sm font-medium">
                Select Eligible Branches
              </label>
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
                <p>Get Merit List</p>
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
