import React from "react";

function ContactUs() {
  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen bg-white">
        {/* COMPONENT CODE */}
        <div className="container mx-auto my-4 px-4 lg:px-20">
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
                placeholder="First Name*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Last Name*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Phone*"
              />
            </div>
            <div className="my-4">
              <textarea
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                defaultValue={""}
              />
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-[#1E3A8A] text-gray-100 p-3 rounded-lg w-full 
                        focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </div>
          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-[#1E3A8A] rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Contact Details
              </h1>
              <p className="text-gray-400 text-xl">
                Indian Institute of Technology Ropar, Rupnagar,Punjab -
                140001,India
              </p>
              <div className="my-4 mt-10">
                <div className="flex flex-col">
                  <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
                </div>
                <i className="fas fa-map-marker-alt pt-2 pr-2">
                  <div className="flex flex-col content-center">
                    <h2 className="text-3xl font-medium">Mail Us</h2>
                    <p className="text-gray-400 text-xl">abc@iitrpr.ac.in</p>
                    <p className="text-gray-400 text-xl">xyz@iitrpr.ac.in</p>
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
                      <p className="text-gray-400 text-xl">Tel: xxx-xxx-xxx</p>
                      <p className="text-gray-400 text-xl">Fax: xxx-xxx-xxx</p>
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
