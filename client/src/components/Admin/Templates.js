import React, { useState, useEffect } from "react";
import AddTemplateCard from "./AddTemplateCard";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import DeleteTemplateModal from "./DeleteTemplateModal";
import ViewTemplateModal from "./ViewTemplateModal";
import { Tooltip } from "@mui/material";
import { getAdminType } from "./AdminTypes";

export default function Templates() {
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const admin_type = getAdminType();

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
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 p-10">
      <div className="shadow-xl bg-white min-h-screen rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="flex justify-between">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            List of Templates
          </h3>

          <Tooltip title="Add">
            <button
              type="button"
              onClick={() => setIsAddingTemplate(true)}
              className="focus:outline-none h-11 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
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
        </div>
        {isAddingTemplate ? (
          <div className="mx-auto m-5 w-1/2">
            <AddTemplateCard setIsAddingTemplate={setIsAddingTemplate} />
          </div>
        ) : (
          ""
        )}
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Name
                </th>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Template Scope
                </th>
                <th className="text-center px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Template Type
                </th>
                <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {templateList.map((template) => (
                <tr
                  key={template.template_id}
                  className="text-gray-500 border-b border-gray-100"
                >
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-4 text-left">
                    {template.name}
                  </th>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {template.email_id === "default@template"
                      ? "DEFAULT"
                      : template.email_id === "global@template"
                      ? "GLOBAL"
                      : "PERSONAL"}
                  </td>
                  <td className="border-t-0 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div
                      className={
                        template.type === "APPLICANT LIST"
                          ? "py-3 text-center rounded-lg font-semibold bg-red-50 text-red-900 border border-red-200"
                          : "py-3 text-center rounded-lg font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200"
                      }
                    >
                      {template.type === "APPLICANT LIST"
                        ? "APPLICANT LIST"
                        : "OFFERINGS"}
                    </div>
                  </td>
                  <td className="border-t-0 pl-16 pr-4 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className="flex gap-2 justify-end">
                      <ViewTemplateModal template={template} />
                      {template.email_id === "default@template" ||
                      (template.email_id === "global@template" &&
                        admin_type !== "0") ? (
                        <DeleteTemplateModal
                          template={template}
                          isActive={false}
                        />
                      ) : (
                        <DeleteTemplateModal
                          template={template}
                          isActive={true}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isFetching ? (
            <img
              className="mx-auto h-[200px] w-[200px]"
              alt="Spinner"
              src={screenSpinner}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
