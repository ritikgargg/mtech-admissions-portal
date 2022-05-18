import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import spinner from "../../images/SpinnerWhite.gif";
import crossPic from "../../images/red_cross.svg";
import { PencilIcon } from "@heroicons/react/outline";
import DatePicker from "./DatePicker";
import { CountryDropdown } from "react-country-region-selector";

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

export default function PersonalInfo(props) {
  const navigate = useNavigate();

  const [profile_image, setProfileImage] = useState(null);
  const [categoryCertificate, setCategoryCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("full_name", props.localProfileInfo.full_name);
    formData.append("fathers_name", props.localProfileInfo.fathers_name);
    formData.append("date_of_birth", props.localProfileInfo.date_of_birth);
    formData.append(
      "aadhar_card_number",
      props.localProfileInfo.aadhar_card_number
    );
    formData.append("category", props.localProfileInfo.category);
    formData.append("is_pwd", props.localProfileInfo.is_pwd);
    formData.append("marital_status", props.localProfileInfo.marital_status);
    formData.append("nationality", props.localProfileInfo.nationality);
    formData.append("gender", props.localProfileInfo.gender);
    formData.append("profile_image", profile_image);
    formData.append("category_certificate", categoryCertificate);

    Axios.post("/save-personal-info", formData, {
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

  const handleFileSubmit = (e, maxSize, setVariable) => {
    const file = e.target.files[0];

    if (
      file.type !== "image/jpeg" &&
      file.type !== "images/jpg" &&
      file.type !== "image/png"
    ) {
      e.target.value = null;
      alert("File format not followed! Allowed formats: .jpeg, .jpg, .png");
      return;
    }

    if (file.size > maxSize * 1000000) {
      e.target.value = null;
      const error =
        "File size cannot exceed more than " + maxSize.toString() + "MB";
      alert(error);
    } else {
      setVariable(file);
    }
  };

  function closePersonalInfo() {
    setProfileImage(null);
    setCategoryCertificate(null);
    props.syncLocalGlobalData();
    handleClose();
  }

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
                onClick={closePersonalInfo}
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
              <div className="px-6 py-6 mx-8 bg-[#f3f4f6]">
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    {/* Personal Details Heading and Sub Heading  */}
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                          Personal Details
                        </h3>
                        <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                          Please share your personal information.
                        </p>
                      </div>
                    </div>

                    {/* Main form */}
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form onSubmit={onSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                          <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                              {/* Applicant's Name */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Full Name
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  name="full_name"
                                  value={props.localProfileInfo.full_name}
                                  id="name"
                                  onChange={(event) =>
                                    props.onChange(event, "full_name")
                                  }
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              {/* Applicant's Father's Name */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="father-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Father's Name
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  name="fathers_name"
                                  value={props.localProfileInfo.fathers_name}
                                  onChange={(event) =>
                                    props.onChange(event, "fathers_name")
                                  }
                                  id="father-name"
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              {/* Upload Applicant's photograph */}
                              <div className="col-span-full sm:col-span-full">
                                <label
                                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                  htmlFor="profile_picture"
                                >
                                  Upload your recent photograph
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>

                                {!props.localProfileInfo.profile_image_url &&
                                !profile_image ? (
                                  <>
                                    <input
                                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                      aria-describedby="profile-picture-desc"
                                      id="profile_picture"
                                      type="file"
                                      required
                                      accept=".jpeg, .jpg, .png"
                                      onChange={(e) =>
                                        handleFileSubmit(e, 2, setProfileImage)
                                      }
                                    />
                                    <div
                                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                      id="profile-picture-desc"
                                    >
                                      <span className="font-semibold">
                                        Maximum file size:
                                      </span>{" "}
                                      2 MB,{" "}
                                      <span className="font-semibold">
                                        Allowed file formats:
                                      </span>{" "}
                                      .jpg, .png, .jpeg
                                      <br />
                                      <div className="mt-1">
                                        <span className="font-semibold">
                                          Recommended File Name Format:
                                        </span>
                                        <span>
                                          {" "}
                                          Photograph_&lt;your_email_id&gt;{" "}
                                          <br />
                                          Example: Photograph_abc@gmail.com
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                      <input
                                        className="border-none block w-full shadow-sm sm:text-sm"
                                        id="profile_picture"
                                        name="profile_picture"
                                        type="text"
                                        value={
                                          profile_image
                                            ? profile_image.name
                                            : props.localProfileInfo.profile_image_url.substring(
                                                props.localProfileInfo.profile_image_url.lastIndexOf(
                                                  "/"
                                                ) + 1,
                                                props.localProfileInfo.profile_image_url.lastIndexOf(
                                                  "_"
                                                )
                                              )
                                        }
                                        readOnly
                                      />

                                      <button
                                        type="button"
                                        className="flex focus:outline-none items-center ml-2 mr-2 justify-center"
                                        onClick={() => {
                                          props.emptyFile("profile_image_url");
                                          setProfileImage(null);
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

                              {/* Date of Birth */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="date-of-birth"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Date of Birth
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <DatePicker
                                  onChange={(event) =>
                                    props.onChange(event, "date_of_birth")
                                  }
                                  value={props.localProfileInfo.date_of_birth}
                                />
                              </div>

                              {/* Aadhar Card Number */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="aadhar-number"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Aadhar Card Number
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <input
                                  type="text"
                                  value={
                                    props.localProfileInfo.aadhar_card_number
                                  }
                                  onChange={(event) =>
                                    props.onChange(event, "aadhar_card_number")
                                  }
                                  name="aadhar_card_number"
                                  id="aadhar-number"
                                  pattern="[1-9]{1}[0-9]{11}"
                                  title="12 digit number"
                                  required
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              {/* Category */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="category"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Category
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <select
                                  id="category"
                                  name="category"
                                  value={props.localProfileInfo.category}
                                  onChange={(event) =>
                                    props.onChange(event, "category")
                                  }
                                  required
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="">Select Category</option>
                                  <option value="GEN">GEN</option>
                                  <option value="EWS">EWS</option>
                                  <option value="OBC">OBC</option>
                                  <option value="SC">SC</option>
                                  <option value="ST">ST</option>
                                </select>
                              </div>

                              {/* Category Certificate */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                  htmlFor="user_avatar"
                                >
                                  Category Certificate (SC/ST/OBC/PwD/EWS)
                                </label>

                                {!props.localProfileInfo
                                  .category_certificate_url &&
                                !categoryCertificate ? (
                                  <>
                                    <input
                                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                      aria-describedby="category-certificate-desc"
                                      id="category-certificate"
                                      type="file"
                                      accept=".jpeg, .jpg, .png"
                                      onChange={(e) =>
                                        handleFileSubmit(
                                          e,
                                          2,
                                          setCategoryCertificate
                                        )
                                      }
                                    />
                                    <div
                                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                      id="category-certificate-desc"
                                    >
                                      <span className="font-semibold">
                                        {" "}
                                        Maximum file size:{" "}
                                      </span>
                                      2 MB
                                    </div>
                                    <div
                                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                      id="category-certificate-desc"
                                    >
                                      <span className="font-semibold">
                                        Allowed file formats:
                                      </span>{" "}
                                      .jpg, .jpeg, .png
                                    </div>
                                    <div
                                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                      id="category-certificate-desc"
                                    >
                                      <span className="font-semibold">
                                        Recommended File Name Format:
                                      </span>
                                      <span>
                                        {" "}
                                        Category_Certificate_&lt;your_email_id&gt;
                                        <br />
                                        Example:
                                        Category_Certificate_abc@gmail.com
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                      <input
                                        className="border-none block w-full shadow-sm sm:text-sm"
                                        id="category-certificate"
                                        name="category-certificate"
                                        type="text"
                                        value={
                                          categoryCertificate
                                            ? categoryCertificate.name
                                            : props.localProfileInfo.category_certificate_url.substring(
                                                props.localProfileInfo.category_certificate_url.lastIndexOf(
                                                  "/"
                                                ) + 1,
                                                props.localProfileInfo.category_certificate_url.lastIndexOf(
                                                  "_"
                                                )
                                              )
                                        }
                                        readOnly
                                      />

                                      <button
                                        type="button"
                                        className="focus:outline-none flex items-center ml-2 mr-2 justify-center"
                                        onClick={() => {
                                          props.emptyFile(
                                            "category_certificate_url"
                                          );
                                          setCategoryCertificate(null);
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

                              {/* PWD Category */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="pwd-category"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Whether belongs to PWD category
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <select
                                  id="pwd-category"
                                  required
                                  value={props.localProfileInfo.is_pwd}
                                  onChange={(event) =>
                                    props.onChange(event, "is_pwd")
                                  }
                                  name="is_pwd"
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="">Select Choice</option>
                                  <option value="YES">YES</option>
                                  <option value="NO">NO</option>
                                </select>
                              </div>

                              {/* Marital Status */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="marital-status"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Marital Status
                                </label>
                                <select
                                  id="marital-status"
                                  value={props.localProfileInfo.marital_status}
                                  onChange={(event) =>
                                    props.onChange(event, "marital_status")
                                  }
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="">Select Status</option>
                                  <option value="Unmarried">Unmarried</option>
                                  <option value="Married">Married</option>
                                </select>
                              </div>

                              {/* Nationality */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="nationality"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Nationality
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <CountryDropdown
                                  required
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  value={props.localProfileInfo.nationality}
                                  onChange={(val) =>
                                    props.onChangeNationality(val)
                                  }
                                />
                              </div>

                              {/* Gender */}
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="gender"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Gender
                                  <span style={{ color: "#ff0000" }}> *</span>
                                </label>
                                <select
                                  value={props.localProfileInfo.gender}
                                  onChange={(event) =>
                                    props.onChange(event, "gender")
                                  }
                                  id="gender"
                                  name="gender"
                                  required
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
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
                              disabled
                              type="submit"
                              className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <img
                                className="h-5 w-5 mx-auto"
                                alt="spinner"
                                src={spinner}
                              />
                            </button>
                          )}
                          <button
                            onClick={closePersonalInfo}
                            data-modal-toggle="personalDetailsModal"
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
