import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import spinner from "../../images/SpinnerWhite.gif";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'

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


export default function AddAdminModal() {
  const [open, setOpen] = React.useState(false);
  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (options) => {
    setSelectedOptions(options);
    console.log(selectedOptions);
};

const options = [
  {value:'h', label: 'Full Name'},
  {value:'p', label: 'Father\'s Name'},
  {value:'', label: 'Date of Birth'},
  {value:'', label: 'Gender'},
  {value:'', label: 'Nationality'},
  {value:'', label: 'Category'},
  {value:'', label: 'Aadhar Card Number'},
  {value: '', label: 'Marital Status' },
  {value: '', label: 'Belongs to PWD' },
  {value: '', label: 'Communication Address' },
  {value: '', label: 'Permanent Address' },
  {value: '', label: 'Mobile Number' },
  {value: '', label: 'Educational Details: 10th' },
  {value: '', label: 'Educational Details: 12th' },
  {value: '', label: 'Educational Details: College' },
  {value: '', label: 'Educational Remarks' },
  {value: '', label: 'Last Degree Completion Status' },
  {value: '', label: 'Year' },
  {value: '', label: 'GATE Enrollment Number' },
  {value: '', label: 'COAP Registration Number' },
  {value: '', label: 'All India Rank' },
  {value: '', label: 'GATE Score' },
  {value: '', label: 'Valid Upto' },
  {value: '', label: 'Self Attested Copies of GATE' },
  {value: '', label: 'Remarks' },
  {value: '', label: 'Amount' },
  {value: '', label: 'Transaction ID' },
  {value: '', label: 'Bank' },
  {value: '', label: 'Transaction Slip'},
  {value: '', label: 'Date of Transaction'},
]

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
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
          Add template
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
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
                <h3 className="text-xl font-bold">New Template</h3>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 focus:outline-none bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <div className="p-2">
                <form className="px-6 pb-6 pt-2 mb-0 space-y-4 ">
                    {/* <div className="flex">
                        <p className="text-lg font-medium">New Template</p>
                        <button
                            type="button"
                            onClick={handleClose}
                            bg-gray-100
                            className="text-gray-400 focus:outline-none bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    </div> */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium">
                            Name
                        </label>
                        <div className="relative mt-1">
                            <input
                            type="text"
                            id="name"
                            // onChange={(e) => handleChange(e, "name")}
                            className="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Name of the template"
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <label  htmlFor="email" className="text-sm font-medium">
                            Type
                        </label>
                        <select
                            id="department"
                            // {...register("department")}
                            required
                            className="mt-1 w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            >
                            <option value="">- Select -</option>
                            <option value="APPLICANT LIST">APPLICANT LIST</option>
                            {/* <option value="Applications">Offerings</option>
                            <option value="Applications">Admins</option> */}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Select Columns
                        </label>
                        <Select
                            // className='mt-1 w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
                            // styles={customStyles}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti={true}
                            options={options}
                            onChange={handleChange}
                            maxMenuHeight={200}
                            />
                    </div>
                    <button
                    type="submit"
                    className="block w-full bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 focus:outline-none px-5 py-3 text-sm font-medium text-white rounded-lg"
                    >
                    Add template
                    </button>
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
