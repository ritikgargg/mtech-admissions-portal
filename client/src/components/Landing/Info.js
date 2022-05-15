import React from "react";

function Info() {
  const curr_year = new Date().getFullYear();

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
      <div className="card w-9/12 sm:w-10/12 md:w-11/12 ml-14 my-2 mb-6 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Final Authority</h2>
          <p>
            In all matters relating to the admission to MTech programme, the
            decision of the MTech Admission Committee is final.
          </p>
        </div>
      </div>
      <div>
        {/* Base - Left */}
        <a
          className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-indigo-600 rounded group active:bg-indigo-500 focus:outline-none focus:ring"
          href="/download"
        >
          <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
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
          </span>
          <span className="text-sm font-medium transition-all group-hover:mr-4">
            Brochure
          </span>
        </a>
        {/* Border - Left */}
        <a
          className="relative inline-flex items-center px-8 py-3 overflow-hidden text-indigo-600 border border-current rounded group active:text-indigo-500 focus:outline-none focus:ring"
          href="/download"
        >
          <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
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
          </span>
          <span className="text-sm font-medium transition-all group-hover:mr-4">
            Score List
          </span>
        </a>
      </div>
    </div>
  );
}

export default Info;
