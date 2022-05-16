import React, { useState, useEffect } from "react";
import Axios from "axios";

function Info() {
  const curr_year = new Date().getFullYear();
  const [reqUrls, setReqUrls] = useState({});
  const [isCyclePresent, setIsCyclePresent] = useState(false);

  useEffect(() => {
    Axios.get("/get-brochure-ranklist-url")
      .then((response) => {
        if (response.data === 1) {
          setIsCyclePresent(false);
        } else {
          setReqUrls(response.data);
          setIsCyclePresent(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Selection</h2>
          <p>
            Selection will be based on the GATE performance for the year{" "}
            {curr_year - 2}/{curr_year - 1}/{curr_year}. Please note that the
            candidates are required to register on "Common Offer and Acceptance
            Portal" (COAP) 2021(
            <a
              href="https://coap.iitd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgb(88 80 236)" }}
            >
              https://coap.iitd.ac.in/
            </a>
            ) before applying online to the Institute. You are required to look
            at COAP Website for all round of the offers.
          </p>
        </div>
      </div>
      <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Financial Assistance</h2>
          <p>
            GATE fellowship at the rate of Rs. 12400/- p.m. (tenable for a
            maximum period of 24 months) will be awarded to Indian Nationals
            doing the MTech Programmes, subject to Institute rules. They are
            required to assist the department for 8 hours of work per week
            related to academic activities of the department such as laboratory
            demonstration, tutorials, evaluation of assignments, test papers,
            seminars, research projects etc.
          </p>
        </div>
      </div>
      <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Reservation of Seats</h2>
          <p>
            Seats are reserved for Indian National under the categories, SC / ST
            / OBC(Non-creamy layer) / EWS(Economically Weaker Section) and
            PWD(Persons with Disability) according to the Government of India
            rules.
          </p>
        </div>
      </div>
      <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Final Authority</h2>
          <p>
            In all matters relating to the admission to MTech programme, the
            decision of the MTech Admission Committee is final.
          </p>
        </div>
      </div>

      {isCyclePresent ? (
        <div>
          <a
            href={reqUrls.brochure_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 flex flex-col justify-between p-8 transition-shadow bg-white rounded-sm shadow-xl group hover:shadow-lg"
          >
            <div>
              <h5 className="text-3xl font-bold text-indigo-600">
                Information Brochure for M.Tech. Admissions
              </h5>
              <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                <p className="text-sm font-medium tracking-widest text-gray-500">
                  Detailed Information Brochure for admissions to M.Tech.
                  programme at IIT Ropar for the current academic year.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center mt-12 text-indigo-600">
              <p className="text-lg font-medium">Open Brochure</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
          <a
            href={reqUrls.rank_list_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 flex flex-col justify-between p-8 transition-shadow bg-white rounded-sm shadow-xl group hover:shadow-lg"
          >
            <div>
              <h5 className="text-3xl font-bold text-indigo-600">
                GATE Opening and Closing Score
              </h5>
              <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                <p className="text-sm font-medium tracking-widest text-gray-500">
                  GATE Opening and Closing Score for admissions to M.Tech.
                  programme at IIT Ropar for the previous academic year.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center mt-12 text-indigo-600">
              <p className="text-lg font-medium">Open Score List</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Info;
