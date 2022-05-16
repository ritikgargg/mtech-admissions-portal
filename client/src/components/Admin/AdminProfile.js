import React, { useState, useEffect } from "react";
import ProfileSettingsImage from "../../images/Asset 7.svg";
import ProfileSettingsImageMobile from "../../images/admin-profile.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import screenSpinner from "../../images/2300-spinner.gif";
import spinner from "../../images/SpinnerWhite.gif";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";
import { Tooltip } from "@mui/material";
import Tick from "../../images/tick.svg";

export default function AdminProfile() {
  const [profile, setProfile] = useState({});
  const [isInputField, setIsInputField] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function onSubmit() {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("name", profileName);
    formData.append("email_id", profile.email_id);
    axios
      .post("/edit-admin-profile", formData, {
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
  }

  useEffect(() => {
    axios
      .get("/get-admin-profile", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setProfile(response.data);
          setProfileName(response.data.name);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isFetching ? (
        <img
          className="mx-auto my-40 h-[200px] w-[200px]"
          alt="Spinner"
          src={screenSpinner}
        />
      ) : (
        <div className="max-w-4xl flex items-center h-auto my-28 flex-wrap mx-auto">
          {/*Main Col*/}
          <div
            id="profile"
            className="w-full lg:w-1/2 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              {/* Image for mobile view*/}
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${ProfileSettingsImageMobile})`,
                }}
              />
              {!isInputField ? (
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                    {profile.name}
                  </h1>
                  <Tooltip title="Edit">
                    <button
                      type="button"
                      onClick={() => {
                        setIsInputField(true);
                      }}
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
                </div>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <input
                      type="text"
                      id="name"
                      onChange={(e) => setProfileName(e.target.value)}
                      value={profileName}
                      className="w-full p-2 pr-8 text-sm border-gray-200 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <Tooltip title="Save">
                      {!isLoading ? (
                        <button
                          type="button"
                          onClick={onSubmit}
                          className="mr-2 focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <img className="h-5 w-5" src={Tick} alt="Save" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="mr-2 focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <img
                            className="h-5 w-5 mx-auto"
                            alt="spinner"
                            src={spinner}
                          />
                        </button>
                      )}
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <button
                        onClick={() => {
                          setProfileName(profile.name);
                          setIsInputField(false);
                        }}
                        type="button"
                        className="text-white focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
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
                    </Tooltip>
                  </div>
                </div>
              )}

              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <EmailIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />{" "}
                {profile.email_id}
              </p>

              <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <AdminPanelSettingsIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />
                {profile.admin_type === 0 ? "SUPER ADMIN" : "FACULTY"}
              </p>

              <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <WorkIcon
                  className="mr-3"
                  fontSize="small"
                  sx={{ color: "#00A36C" }}
                />
                {profile.admin_type === 0 ? (
                  "Academics"
                ) : (
                  <div className="block">
                    {profile.department.map((dep) => {
                      return (
                        <>
                          <span>{dep}</span>
                          <br />
                        </>
                      );
                    })}
                  </div>
                )}
              </p>
            </div>
          </div>
          {/*Img Col*/}
          <div className="w-full lg:w-2/5">
            {/* Big profile image for side bar (desktop) */}
            <img
              src={ProfileSettingsImage}
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="Spinner"
            />
          </div>
        </div>
      )}
    </>
  );
}
