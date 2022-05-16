import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import spinner from "../../images/SpinnerWhite.gif";
import fileSaver from "file-saver";

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

export default function ExportExcelModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/get-templates", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setTemplateList(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onExport = (template_id) => {
    Axios.get("/get-applications-in-excel", {
      responseType: "arraybuffer",
      headers: {
        Authorization: getToken(),
        template_id: parseInt(template_id),
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
            "Applications_List_" + props.offeringName + "_" + props.cycleName;
          fileSaver.saveAs(blob, fileName);
          onClose();
          setIsLoading(false);
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const onClose = () => {
    setSelectedTemplate("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onExport(selectedTemplate);
  };

  return (
    <div>
      <Tooltip title="Export">
        <button
          onClick={handleOpen}
          type="button"
          className="focus:outline-none w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          Export
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
                <h3 className="text-xl font-semibold">Choose Template</h3>
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
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="admin_type"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Select Template
                      </label>

                      <select
                        id="template"
                        required
                        name="template"
                        value={selectedTemplate}
                        onChange={(e) => {
                          setSelectedTemplate(e.target.value);
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      >
                        <option value="">- Select -</option>
                        {templateList.map((item) => {
                          return (
                            <option
                              key={item.template_id}
                              value={item.template_id}
                            >
                              {item.name} -{" "}
                              {item.email_id === "default@template"
                                ? "DEFAULT"
                                : item.email_id === "global@template"
                                ? "GLOBAL"
                                : "PERSONAL"}
                            </option>
                          );
                        })}
                      </select>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                        <p>
                          To manage (add/view/delete) templates, please visit
                          the
                          <span className="italic font-semibold">
                            {" "}
                            Templates{" "}
                          </span>
                          page.
                        </p>
                      </div>
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
                          <p>Download</p>
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
