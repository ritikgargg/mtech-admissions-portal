import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import spinner from "../../images/SpinnerWhite.gif";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

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

export default function EditAdminModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [adminType, setAdminType] = useState(props.admin.admin_type);

  const initSelectOptions = () => {
    let temp = [];
    for (let i = 0; i < props.admin.department.length; i++) {
      temp.push({
        value: props.admin.department[i],
        label: props.admin.department[i],
      });
    }
    return temp;
  };
  const [selectedOptions, setSelectedOptions] = useState(initSelectOptions);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const options = [
    { value: "Biomedical Engineering", label: "Biomedical Engineering" },
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    {
      value: "Computer Science and Engineering",
      label: "Computer Science and Engineering",
    },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  ];

  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...props.admin,
      department: "Academics",
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const onClose = () => {
    reset();
    setAdminType(props.admin.admin_type);
    setSelectedOptions(initSelectOptions);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    let filteredOptions = [];
    if (adminType === 0) {
      for (let i = 0; i < options.length; i++) {
        filteredOptions.push(options[i].value);
      }
    } else {
      for (let i = 0; i < selectedOptions.length; i++) {
        filteredOptions.push(selectedOptions[i].value);
      }
    }

    formData.append("name", data.name);
    formData.append("email_id", data.email_id);
    formData.append("admin_type", adminType);
    formData.append("department", JSON.stringify(filteredOptions));

    Axios.post("/edit-admin", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Tooltip title="Edit">
        <button
          type="button"
          onClick={handleOpen}
          className="focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            id="modal-modal-description"
            className="relative w-full max-w-2xl h-full md:h-auto"
          >
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Edit admin</h3>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent focus:outline-none hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <div className="px-6 pt-6 pb-2 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        id="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="email_id"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email_id")}
                        id="email_id"
                        disabled
                        className="cursor-not-allowed shadow-sm bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="admin_type"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Role
                      </label>

                      <select
                        id="admin_type"
                        required
                        name="admin_type"
                        value={adminType}
                        onChange={(event) => {
                          setAdminType(parseInt(event.target.value));
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      >
                        <option value="">- Select -</option>
                        <option value={0}>SUPER ADMIN</option>
                        <option value={1}>FACULTY</option>
                        <option value={3}>STAFF</option>
                      </select>
                    </div>
                    {adminType === 0 && (
                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="department"
                          className="text-sm font-medium text-gray-900 block mb-2"
                        >
                          Department
                        </label>

                        <select
                          id="department"
                          {...register("department")}
                          required
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        >
                          <option value="">- Select -</option>
                          <option value="Academics">Academics</option>
                        </select>
                      </div>
                    )}

                    {(adminType === 1 || adminType === 3) && (
                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="department"
                          className="text-sm font-medium text-gray-900 block mb-2"
                        >
                          Department
                        </label>

                        <Select
                          styles={customStyles}
                          value={selectedOptions}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti={true}
                          options={options}
                          onChange={handleChange}
                          maxMenuHeight={150}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-5 items-start h-[1px] bg-gray-200" />
                  <div className="p-3 border-t border-gray-200 rounded-b">
                    {!isLoading ? (
                      <button
                        className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                        type="submit"
                      >
                        <div className="w-20 h-5 mx-5 my-2.5">
                          <p>Edit admin</p>
                        </div>
                      </button>
                    ) : (
                      <button
                        className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                        type="submit"
                        disabled
                      >
                        <div className="w-20 h-5 mx-5 my-2.5">
                          <img
                            className="h-5 w-5 mx-auto"
                            alt="spinner"
                            src={spinner}
                          />
                        </div>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
