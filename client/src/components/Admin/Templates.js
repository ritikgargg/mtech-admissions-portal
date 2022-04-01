import React, { useState } from 'react';
import { formHelperTextClasses, Tooltip } from "@mui/material";
import { useForm } from 'react-hook-form';
import AddTemplateModal from './AddTemplateModal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
// import TagPicker from './TagPicker';

export default function Templates () {
    // TODO 1: Add Template Modal change karna hai
    // TODO 2: Delete Template same
    // TODO 3: View Template change
    const [addAdmin, setAddAdmin] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const animatedComponents = makeAnimated();
    // const [register, handleSubmit, reset] = useForm();

    const handleChange = (options) => {
        setSelectedOptions(options);
        console.log(selectedOptions);
    };

    const options = [
        {value:'', label: 'Full Name'},
        {value:'', label: 'Father\'s Name'},
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
        {value: '', label: 'Valid Upto' }

    ]

    return (
        <div className="bg-gray-100 p-10">
            {
                addAdmin && (
                    <div className="mb-10 space-y-4 ">
                        <div className="max-w-lg mx-auto rounded-lg shadow-xl bg-white">
                        <form className="p-8 mb-0 space-y-4 ">
                            <div className="flex">
                                <p className="text-lg font-medium">New Template</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // setCycleInfo(empty_cycle);
                                        // setAddAdmissionCycle(false);
                                        setAddAdmin(false);
                                    }}bg-gray-100
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
                            </div>
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
                )
            }
            <div className="shadow-xl bg-white min-h-screen rounded-lg p-4 sm:p-6 xl:p-8">
                <div className="flex justify-between">
                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                    List of Templates
                    </h3>
                    { !addAdmin && <AddTemplateModal onClick={setAddAdmin}/>}
                </div>
            </div>
        </div>
    );
}