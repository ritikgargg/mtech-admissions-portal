import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import spinner from "../../images/SpinnerWhite.gif";
import crossPic from "../../images/red_cross.svg";
import fileSaver from "file-saver";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function UploadResultModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [resultExcel, setResultExcel] = useState(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("cycle_id", props.cycle_id);
    formData.append("offering_id", props.offering_id);
    formData.append("result_excel", resultExcel);

    Axios.post("/upload-result", formData, {
      responseType: "arraybuffer",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          var blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          fileSaver.saveAs(blob, "Report");
          setIsLoading(false);
          setResultExcel(null);
          handleClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Tooltip title="Upload Result">
        <button
          onClick={handleOpen}
          type="button"
          className="focus:outline-none w-1/2 text-white bg-black focus:ring-4 focus:ring-gray-200 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Upload
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
                <h3 className="text-xl font-semibold ml-4">Upload Result</h3>
                <button
                  onClick={handleClose}
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
                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full mx-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="result_excel"
                      >
                        Upload File
                      </label>

                      {!resultExcel ? (
                        <>
                          <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="result_excel_desc"
                            id="result_excel"
                            type="file"
                            accept=".xls, .xlsx"
                            onChange={(e) => {
                              setResultExcel(e.target.files[0]);
                            }}
                            required
                          />

                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="result_excel_desc"
                          >
                            <span className="font-semibold">
                              Allowed file formats:
                            </span>{" "}
                            .xls, .xlsx
                          </div>
                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="result_excel_desc"
                          >
                            <p>
                              <span className="font-semibold">Note:</span> The
                              uploaded excel file should necessarily contain the
                              following fields, besides other fields(if any).
                              Moreover the status can only have two options
                              "Selected" or "Not Selected"{" "}
                            </p>
                            <p>
                              <span className="font-semibold">Note:</span>{" "}
                            </p>
                            <ol>
                              <li className="font-semibold italic">
                                - Email ID
                              </li>
                              <li className="font-semibold italic">- Status</li>
                              <li className="font-semibold italic">
                                - Status Remark
                              </li>
                            </ol>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <input
                              className="border-none block w-full shadow-sm sm:text-sm"
                              id="result_excel"
                              name="result_excel"
                              type="text"
                              value={resultExcel.name}
                              readOnly
                            />

                            <button
                              type="button"
                              className="focus:outline-none flex items-center ml-2 mr-2 justify-center"
                              onClick={() => {
                                setResultExcel(null);
                              }}
                            >
                              <img
                                className="w-6 h-6"
                                src={crossPic}
                                alt="Cross"
                              ></img>
                            </button>
                          </div>
                        </>
                      )}
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
                          <p>Upload</p>
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
