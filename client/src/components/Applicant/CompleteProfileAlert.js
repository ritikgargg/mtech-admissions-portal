import React from "react";

function CompleteProfile(props) {
  return (
    <>
      <div className="p-4 bg-yellow-100 dark:bg-yellow-200" role="alert">
        <div className="pt-2 px-4 flex space-x-6">
          <div className="flex items-center">
            <svg
              className="mr-2 w-5 h-5 text-yellow-700 dark:text-yellow-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-800">
              Profile Not Complete
            </h3>
          </div>
          <div className="flex">
            <a href="/my-profile">
              <button
                type="button"
                className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-yellow-800 dark:hover:bg-yellow-900"
              >
                <svg
                  className="-ml-0.5 mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Visit Profile
              </button>
            </a>
            <button
              type="button"
              onClick={() => props.setProfileComplete(2)}
              className="focus:outline-none text-yellow-700 bg-transparent border border-yellow-700 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-yellow-800 dark:text-yellow-800 dark:hover:text-white"
              aria-label="Close"
            >
              Dismiss
            </button>
          </div>
        </div>
        <div className="px-4 mt-2 mb-3 text-sm text-yellow-700 dark:text-yellow-800">
          Mandatory details must be filled in your profile. Please complete your
          profile first to participate in the admission process.
        </div>
      </div>
    </>
  );
}

export default CompleteProfile;
