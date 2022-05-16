import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Toggle from "./Toggle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import spinner from "../../images/SpinnerWhite.gif";
import { getAdminType } from "./AdminTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function AddOfferingModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [applicationChecked, setApplicationChecked] = useState(false);
  const [draftChecked, setDraftChecked] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const admin_type = getAdminType();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const handleChange1 = (event) => {
    setApplicationChecked(event.target.checked);
  };

  const handleChange2 = (event) => {
    setDraftChecked(event.target.checked);
  };

  const onClose = () => {
    reset();
    setApplicationChecked(false);
    setDraftChecked(false);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("department", data.department);
    formData.append("specialization", data.specialization);
    formData.append("seats", data.seats);
    formData.append("gate_paper_codes", data.gate_paper_codes);
    formData.append("eligibility", data.eligibility);
    formData.append("deadline", data.deadline);
    formData.append("is_accepting_applications", applicationChecked);
    formData.append("is_draft_mode", draftChecked);
    formData.append("cycle_id", props.cycle_id);

    Axios.post("/add-offering", formData, {
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
      <Tooltip title="Add">
        <button
          type="button"
          onClick={handleOpen}
          className="focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
        >
          <svg
            className="-ml-1 mr-2 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Offering
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
                <h3 className="text-xl font-semibold">Add offering</h3>
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
                    <div className="col-span-6 sm:col-span-3">
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
                        {props.department.map((dept) => {
                          return (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="specialization"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Specialization
                      </label>
                      <input
                        type="text"
                        {...register("specialization")}
                        id="specialization"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="gate_paper_codes"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        GATE Paper Codes
                      </label>
                      <input
                        type="text"
                        {...register("gate_paper_codes")}
                        id="gate_paper_codes"
                        pattern="([A-Z]+, *)*[A-Z]+$"
                        title="Comma-separated GATE codes(in capital alphabets)"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="seats"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Seats
                      </label>
                      <input
                        type="text"
                        {...register("seats")}
                        id="seats"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="deadline"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Deadline
                      </label>
                      <input
                        type="date"
                        required
                        id="deadline"
                        {...register("deadline")}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="eligibility"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Eligibility
                      </label>
                      <textarea
                        required
                        {...register("eligibility")}
                        id="eligibility"
                        rows={6}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="mt-5 items-start h-[1px] bg-gray-200" />
                  <div className="flex justify-between">
                    {admin_type === "0" ? (
                      <>
                        <div className="p-3">
                          <FormControlLabel
                            control={
                              <Toggle
                                checked={applicationChecked}
                                onChange={handleChange1}
                                sx={{ m: 1 }}
                              />
                            }
                            label="Accept Applications"
                          />
                        </div>
                        <div className="p-3">
                          <FormControlLabel
                            control={
                              <Toggle
                                checked={draftChecked}
                                onChange={handleChange2}
                                sx={{ m: 1 }}
                              />
                            }
                            label="Draft Mode"
                          />
                        </div>
                      </>
                    ) : (
                      <h3 className="italic text-base font-normal text-gray-500 mt-4 mb-1">
                        This offering will be added in draft mode.
                      </h3>
                    )}

                    <div className="p-3 border-t border-gray-200 rounded-b">
                      {!isLoading ? (
                        <button
                          className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                          type="submit"
                        >
                          <div className="w-25 h-5 mx-5 my-2.5">
                            <p>Add Offering</p>
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
