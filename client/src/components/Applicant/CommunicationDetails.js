import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import spinner from "../../images/SpinnerWhite.gif";
import { PencilIcon } from "@heroicons/react/outline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "87%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function CommunicationDetails(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();

    formData.append(
      "communication_address",
      props.localProfileInfo.communication_address
    );
    formData.append(
      "communication_city",
      props.localProfileInfo.communication_city
    );
    formData.append(
      "communication_state",
      props.localProfileInfo.communication_state
    );
    formData.append(
      "communication_pincode",
      props.localProfileInfo.communication_pincode
    );
    formData.append(
      "permanent_address",
      props.localProfileInfo.permanent_address
    );
    formData.append("permanent_city", props.localProfileInfo.permanent_city);
    formData.append("permanent_state", props.localProfileInfo.permanent_state);
    formData.append(
      "permanent_pincode",
      props.localProfileInfo.permanent_pincode
    );
    formData.append("mobile_number", props.localProfileInfo.mobile_number);
    formData.append(
      "alternate_mobile_number",
      props.localProfileInfo.alternate_mobile_number
    );

    Axios.post("/save-communication-details", formData, {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit Details">
        <button
          type="button"
          onClick={handleOpen}
          className="w-5 text-indigo-600 focus:outline-none"
        >
          <PencilIcon />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-description" className="relative w-full h-full">
            <div className="flex items-start justify-between py-3 px-5 border-b rounded-t">
              <button
                onClick={() => {
                  props.syncLocalGlobalData();
                  handleClose();
                }}
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

            <div className="overflow-y-auto overflow-x-hidden overscroll-none h-5/6">
              <div className="px-6 py-6 mx-10 bg-[#f3f4f6]">
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                          Communication Details
                        </h3>
                        <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                          Please share your communication details.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form onSubmit={onSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                          <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                              <div className="col-span-full sm:col-span-full">
                                <label
                                  htmlFor="communication_address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Address for Communication
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <div className="mt-1">
                                  <textarea
                                    id="communication_address"
                                    name="communication_address"
                                    value={
                                      props.localProfileInfo
                                        .communication_address
                                    }
                                    onChange={(event) =>
                                      props.onChange(
                                        event,
                                        "communication_address"
                                      )
                                    }
                                    rows={4}
                                    className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    required
                                  />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  (with city, state and Pincode)
                                </p>
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="communication_city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  id="communication_city"
                                  value={
                                    props.localProfileInfo.communication_city
                                  }
                                  name="communication_city"
                                  onChange={(event) =>
                                    props.onChange(event, "communication_city")
                                  }
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="communication_state"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  value={
                                    props.localProfileInfo.communication_state
                                  }
                                  name="communication_state"
                                  onChange={(event) =>
                                    props.onChange(event, "communication_state")
                                  }
                                  id="communication_state"
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="communication_pincode"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  PIN Code
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  id="communication_pincode"
                                  value={
                                    props.localProfileInfo.communication_pincode
                                  }
                                  name="communication_pincode"
                                  onChange={(event) =>
                                    props.onChange(
                                      event,
                                      "communication_pincode"
                                    )
                                  }
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="mt-8 outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                              <div className="col-span-full sm:col-span-full">
                                <label
                                  htmlFor="permanent_address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Permanent Address
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <div className="mt-1">
                                  <textarea
                                    id="permanent_address"
                                    rows={4}
                                    required
                                    value={
                                      props.localProfileInfo.permanent_address
                                    }
                                    onChange={(event) =>
                                      props.onChange(event, "permanent_address")
                                    }
                                    name="permanent_address"
                                    className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  (with city, state and Pincode)
                                </p>
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="permanent_city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  value={props.localProfileInfo.permanent_city}
                                  onChange={(event) =>
                                    props.onChange(event, "permanent_city")
                                  }
                                  name="permanent_city"
                                  id="permanent_city"
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="permanent_state"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  id="permanent_state"
                                  value={props.localProfileInfo.permanent_state}
                                  onChange={(event) =>
                                    props.onChange(event, "permanent_state")
                                  }
                                  name="permanent_state"
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="permanent_pincode"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  PIN Code
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  id="permanent_pincode"
                                  value={
                                    props.localProfileInfo.permanent_pincode
                                  }
                                  onChange={(event) =>
                                    props.onChange(event, "permanent_pincode")
                                  }
                                  name="permanent_pincode"
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="mt-8 outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="mobile_number"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Mobile Number
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={props.localProfileInfo.mobile_number}
                                  onChange={(event) =>
                                    props.onChange(event, "mobile_number")
                                  }
                                  name="mobile_number"
                                  id="mobile_number"
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="alternate_mobile_number"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Alternate Mobile Number
                                </label>
                                <input
                                  type="text"
                                  value={
                                    props.localProfileInfo
                                      .alternate_mobile_number
                                  }
                                  onChange={(event) =>
                                    props.onChange(
                                      event,
                                      "alternate_mobile_number"
                                    )
                                  }
                                  name="alternate_mobile_number"
                                  id="alternate_mobile_number"
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-4 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                          {!isLoading ? (
                            <button
                              type="submit"
                              className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <img
                                src={spinner}
                                className="mx-auto h-5 w-5"
                                alt="Spinner"
                              />
                            </button>
                          )}

                          <button
                            onClick={() => {
                              props.syncLocalGlobalData();
                              handleClose();
                            }}
                            type="button"
                            className="text-gray-500 focus:outline-none bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
