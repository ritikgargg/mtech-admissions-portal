import axios from "axios";
import React from "react";
import { useState } from "react";

function ContactUs() {
  const [successMsg, setSuccessMsg] = useState(0);
  const [errorMsg, setErrorMsg] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    const msgVal = e.target.message.value;
    var re = /.*\S+.*/g;
    var result = msgVal.match(re);

    if (result === null) {
      setErrorMsg(1);
    } else {
      let msg = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: msgVal,
      };

      axios.post("/contact-us", msg).then((response) => {
        setSuccessMsg(1);
        setErrorMsg(0);
        e.target.reset();
      });
    }
  };

  return (
    <div>
      {successMsg === 1 ? (
        <div
          id="alert"
          className="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
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
          <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
            Thank you for contacting us! We will reach out to you shortly.
          </div>
          <button
            type="button"
            onClick={() => setSuccessMsg(0)}
            className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
            data-collapse-toggle="alert"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
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
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}

      {errorMsg === 1 ? (
        <div
          id="alert-2"
          className="flex p-4 mb-4 bg-yellow-100 rounded-lg dark:bg-yellow-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-yellow-700 dark:text-yellow-800"
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
          <div className="ml-3 text-sm font-medium text-yellow-700 dark:text-yellow-800">
            Message cannot be empty! Please write a valid message.
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(0)}
            className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300"
            data-collapse-toggle="alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
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
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-center items-center bg-white min-h-screen">
        {/* COMPONENT CODE */}
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <form onSubmit={onSubmit}>
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h1 className="font-bold uppercase text-4xl">
                  Send us a message
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  pattern=".*\S+.*"
                  title="First name cannot be empty"
                  required
                  name="firstName"
                  placeholder="First Name*"
                />
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  required
                  name="email"
                  placeholder="Email*"
                />
                <input
                  className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  required
                  name="phone"
                  placeholder="Phone*"
                />
              </div>
              <div className="my-4">
                <textarea
                  placeholder="Message*"
                  required
                  type="text"
                  name="message"
                  className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="my-2 w-1/2 lg:w-1/4">
                <button
                  type="submit"
                  className="uppercase text-sm font-bold tracking-wide bg-[#1E3A8A] text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>

          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-[#1E3A8A] rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Contact Details
              </h1>
              <p className="text-gray-400 text-xl">
                Indian Institute of Technology Ropar, Rupnagar, Punjab - 140001,
                India
              </p>
              <div className="my-4 mt-10">
                <div className="flex flex-col">
                  <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
                </div>
                <i className="fas fa-map-marker-alt pt-2 pr-2">
                  <div className="flex flex-col content-center">
                    <h2 className="text-3xl font-medium">Mail Us</h2>
                    <p className="text-gray-400 text-xl">
                      coapcell@iitrpr.ac.in
                    </p>
                    <p className="text-gray-400 text-xl">info@iitrpr.ac.in</p>
                  </div>
                </i>
              </div>
              <i className="fas fa-map-marker-alt pt-2 pr-2">
                <div className="my-4">
                  <div className="flex flex-col">
                    <i className="fas fa-phone-alt pt-2 pr-2"></i>
                  </div>
                  <i className="fas fa-phone-alt pt-2 pr-2">
                    <div className="flex flex-col">
                      <h2 className="text-3xl font-medium">Call Us</h2>
                      <p className="text-gray-400 text-xl">
                        Tel: +91-1881-231114
                      </p>
                      <p className="text-gray-400 text-xl">
                        Tel: +91-1881-231169
                      </p>
                    </div>
                  </i>
                </div>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
