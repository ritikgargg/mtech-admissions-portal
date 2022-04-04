import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
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
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function AddAdminModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };


  const onClose = () => {
    reset();
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email_id", data.email_id);
    if(data.admin_type === "SUPER ADMIN") formData.append("admin_type", 0);
    else formData.append("admin_type", 1);
    formData.append("department", data.department);

    Axios.post("/add-admin", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        }
        else if (response.data === 2) {
          //show error message
          setError(1);
          setIsLoading(false);
        } 
        else {
          sessionStorage.setItem("alert", "1");
          setError(0);
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
          Add admin
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
          <div
            id="modal-modal-description"
            className="relative w-full max-w-2xl h-full md:h-auto"
          >
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Add admin</h3>
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
                    {/* col-span-6 sm:col-span-3  */}
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
                        onChange = {() => setError(0)}
                        className= {error === 1 ? 
                          "shadow-sm bg-red-50 border border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:bg-red-50 focus:border-red-600 block w-full p-2.5"
                          :
                          "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        }
                        required
                      />
                      {error === 1 ? <p className="pl-1 pt-1 text-red-500 text-sm">E-mail address already exists</p> : <></>}
                    </div>
                    
                    {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Accept Applications</label>
                        <Toggle/>
                      </div> */}

                      <div className="col-span-full sm:col-span-full">
                        <label htmlFor="admin_type" className="text-sm font-medium text-gray-900 block mb-2">Role</label>
                        
                        <select
                          id="admin_type"
                          {...register("admin_type")}
                          required
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        >
                          <option value="">- Select -</option>
                          <option value="SUPER ADMIN">SUPER ADMIN</option>
                          <option value="FACULTY">FACULTY</option>
                        </select>
                      </div>
                    <div className="col-span-full sm:col-span-full">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Department</label>
                        
                        <select
                          id="department"
                          {...register("department")}
                          required
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        >
                          <option value="">- Select -</option>
                          <option value="Academics">Academics</option>
                          <option value="Chemical Engineering">Chemical Engineering</option>
                          <option value="Civil Engineering">Civil Engineering</option>
                          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                          <option value="Biomedical Engineering">Biomedical Engineering</option>

                        </select>
                      </div>

                     
                  </div>

                  <div className="mt-5 items-start h-[1px] bg-gray-200" />
                  <div className="p-3 border-t border-gray-200 rounded-b">
                      
                          {!isLoading ? (
                            <button
                              className="text-white focus:outline-none block w-30 h-15 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center"
                              type="submit"
                            >
                              <div className="w-20 h-5 mx-5 my-2.5">
                            <p>Add admin</p>
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
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  );
}
