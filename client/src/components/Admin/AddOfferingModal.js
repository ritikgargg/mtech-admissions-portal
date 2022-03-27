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

export default function EditAlertOfferingModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [applicationChecked, setApplicationChecked] = useState(
    false
  );
  const [draftChecked, setDraftChecked] = useState(
    false
  );
  const { register, handleSubmit, reset } = useForm();

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
    console.log(data);
    console.log(applicationChecked);
    console.log(draftChecked);
    const formData = new FormData();

    formData.append("department", data.department);
    formData.append("specialization", data.specialization);
    formData.append("seats", data.seats);
    formData.append("gate_paper_codes", data.gate_paper_codes);
    formData.append("eligibility", data.eligibility);
    formData.append("deadline", data.deadline);
    formData.append("is_accepting_applications", applicationChecked);
    formData.append("is_draft_mode", draftChecked);

    Axios.post("http://localhost:8080/add-offering", formData, {
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
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
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
        {/* <div
        className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
        id="add-product-modal"
        aria-hidden="true"
      > */}
        <div id="modal-modal-description" className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Add offering</h3>
              <button
                onClick={handleClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                    <input
                      type="text"
                      {...register("department")}
                      id="department"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
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
                      Gate Paper Codes
                    </label>
                    <input
                      type="text"
                      {...register("gate_paper_codes")}
                      id="gate_paper_codes"
                      pattern="([A-Z]+, *)*[A-Z]+$"
                      title="Comma-separated Gate codes(in capital alphabets)"
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
                  {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Accept Applications</label>
                        <Toggle/>
                      </div> */}
                  {/* <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Status</label>
                        
                        <select
                          id="degree"
                          name="degree"
                          required
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        >
                          <option value="">- Select -</option>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div> */}
                  <div className="col-span-full">
                    <label
                      htmlFor="eligibility"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Eligibility
                    </label>
                    <textarea
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

                    {/* <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Accept Applications</label> */}
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

                    {/* <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Accept Applications</label> */}
                  </div>
                  <div className="p-3 w-30 h-15 border-t border-gray-200 rounded-b">
                    <button
                      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                    >
                      {!isLoading ? (
                        "Add Offering"
                      ) : (
                        <img className="w-5 h-5" alt="spinner" src={spinner} />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      {/* </div> */}
        </Box>
      </Modal>
    </div>
  );
}
