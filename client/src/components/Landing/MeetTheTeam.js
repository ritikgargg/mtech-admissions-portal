import React from "react";
import member1Image from "../../images/Anshul Verma.jpg";
import member2Image from "../../images/Piyush Presannan.jpg";
import member3Image from "../../images/Ritik Garg.jpg";
import member4Image from "../../images/Tarun Singla.jpg";
import mentorImage1 from "../../images/DrPuneetGoyal.png";
import mentorImage2 from "../../images/DrAnilShukla.png";
export default function MeetTheTeam() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />
      <div className="flex items-center justify-center min-h-screen bg-white py-8">
        <div className="flex flex-col">
          <div className="flex flex-col mt-8">
            {/* Meet the Team */}
            <div className="container max-w-7xl px-4">
              {/* Section Header */}
              <div className="flex flex-wrap justify-center text-center mb-14">
                <div className="w-full lg:w-6/12 px-4">
                  {/* Header */}
                  <h1 className="text-gray-900 text-4xl font-bold mb-8">
                    Meet the Team
                  </h1>
                  {/* Description */}
                  <p className="text-gray-700 text-lg font-light"></p>
                </div>
              </div>
              {/* Team Members */}
              <div className="flex flex-wrap">
                {/* Member #1 */}
                <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col">
                    {/* Avatar */}
                    <div className="mx-auto">
                      <img
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        alt="Anshul Verma"
                        src={member1Image}
                      />
                    </div>
                    {/* Details */}
                    <div className="text-center mt-6">
                      {/* Name */}
                      <h1 className="text-gray-900 text-xl font-bold mb-1">
                        Anshul Verma
                      </h1>
                      {/* Title */}
                      <div className="text-gray-700 font-light mb-2">
                        B.Tech. CSE, IIT Ropar
                      </div>
                      {/* Social Icons */}
                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        {/* Linkedin */}
                        <a
                          href="https://www.linkedin.com/in/thisisanshulverma/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i className="mdi mdi-linkedin text-indigo-500 mx-auto mt-2" />
                        </a>
                        {/* Email */}
                        <button
                          onClick={() =>
                            (window.location.href =
                              "mailto:2019csb1075@iitrpr.ac.in")
                          }
                          className="focus:outline-none cursor-pointer flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i className="mdi mdi-email text-blue-400 mx-auto mt-2" />
                        </button>
                        {/* Instagram */}
                        <a
                          href="https://instagram.com/anshul_verma.exo?igshid=YmMyMTA2M2Y="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Member #2 */}
                <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col">
                    {/* Avatar */}
                    <div className="mx-auto">
                      <img
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        alt="Piyush Presannan"
                        src={member2Image}
                      />
                    </div>
                    {/* Details */}
                    <div className="text-center mt-6">
                      {/* Name */}
                      <h1 className="text-gray-900 text-xl font-bold mb-1">
                        Piyush Presannan
                      </h1>
                      {/* Title */}
                      <div className="text-gray-700 font-light mb-2">
                        B.Tech. CSE, IIT Ropar
                      </div>
                      {/* Social Icons */}
                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        {/* Linkedin */}
                        <a
                          href="https://www.linkedin.com/in/piyush-presannan-6b241b1a9/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                        </a>
                        {/* Email */}
                        <button
                          onClick={() =>
                            (window.location.href =
                              "mailto:2019csb1106@iitrpr.ac.in")
                          }
                          className="focus:outline-none cursor-pointer flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i className="mdi mdi-email text-blue-400 mx-auto mt-2" />
                        </button>
                        {/* Instagram */}
                        <a
                          href="https://instagram.com/piyush_p1?igshid=YmMyMTA2M2Y="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Member #3 */}
                <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col">
                    {/* Avatar */}
                    <div className="mx-auto">
                      <img
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        alt="Ritik Garg"
                        src={member3Image}
                      />
                    </div>
                    {/* Details */}
                    <div className="text-center mt-6">
                      {/* Name */}
                      <h1 className="text-gray-900 text-xl font-bold mb-1">
                        Ritik Garg
                      </h1>
                      {/* Title */}
                      <div className="text-gray-700 font-light mb-2">
                        B.Tech. CSE, IIT Ropar
                      </div>
                      {/* Social Icons */}
                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        {/* Linkedin */}
                        <a
                          href="https://www.linkedin.com/in/ritikgargg/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                        </a>
                        {/* Email */}
                        <button
                          onClick={() =>
                            (window.location.href =
                              "mailto:2019csb1112@iitrpr.ac.in")
                          }
                          className="focus:outline-none cursor-pointer flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i className="mdi mdi-email text-blue-400 mx-auto mt-2" />
                        </button>
                        {/* Instagram */}
                        <a
                          href="https://instagram.com/ritik._.garg_?igshid=YmMyMTA2M2Y="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Member #4 */}
                <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div className="flex flex-col">
                    {/* Avatar */}
                    <div className="mx-auto">
                      <img
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        alt="Tarun Singla"
                        src={member4Image}
                      />
                    </div>
                    {/* Details */}
                    <div className="text-center mt-6">
                      {/* Name */}
                      <h1 className="text-gray-900 text-xl font-bold mb-1">
                        Tarun Singla
                      </h1>
                      {/* Title */}
                      <div className="text-gray-700 font-light mb-2">
                        B.Tech. CSE, IIT Ropar
                      </div>
                      {/* Social Icons */}
                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300"
                      >
                        {/* Linkedin */}
                        <a
                          href="https://www.linkedin.com/in/tarun-singla/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                        </a>
                        {/* Email */}
                        <button
                          onClick={() =>
                            (window.location.href =
                              "mailto:2019csb1126@iitrpr.ac.in")
                          }
                          className="focus:outline-none cursor-pointer flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i className="mdi mdi-email text-blue-400 mx-auto mt-2" />
                        </button>
                        {/* Instagram */}
                        <a
                          href="https://instagram.com/_taarun?igshid=YmMyMTA2M2Y="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center text-center mt-12">
                <div className="w-full lg:w-6/12 px-4">
                  {/* Header */}
                  <h1 className="text-gray-900 text-3xl font-bold">Mentors</h1>
                </div>
              </div>
              <div className="flex flex-wrap justify-center text-left items-center my-10 gap-6">
                <div className="flex items-center justify-center h-40 w-40 ring-2 ring-gray-700 rounded-full border border-gray-600 overflow-hidden">
                  <img className="" src={mentorImage1} alt="Dr. Puneet Goyal" />
                </div>
                <div>
                  <h1 className="text-gray-900 text-xl font-bold mb-1">
                    Dr. Puneet Goyal
                  </h1>
                  {/* Title */}
                  <div className="text-gray-700 font-light mb-2">
                    Associate Professor
                  </div>
                  <div className="text-gray-700 font-light mb-2">
                    Department of Computer Science and Engineering, IIT Ropar
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center text-left items-center my-10 gap-6">
                <div className="flex items-center justify-center h-40 w-40 ring-2 ring-gray-700 rounded-full border border-gray-600 overflow-hidden">
                  <img className="" src={mentorImage2} alt="Dr. Anil Shukla" />
                </div>
                <div>
                  <h1 className="text-gray-900 text-xl font-bold mb-1">
                    Dr. Anil Shukla
                  </h1>

                  <div className="text-gray-700 font-light mb-2">
                    Assistant Professor
                  </div>
                  <div className="text-gray-700 font-light mb-2">
                    Department of Computer Science and Engineering, IIT Ropar
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center text-center mt-20">
                <div className="w-full lg:w-6/12 px-4">
                  {/* Description */}
                  <p className="text-gray-700 font-light">
                    For any inputs/comments, kindly contact:{" "}
                    <span
                      className="cursor-pointer text-blue-700 font-normal"
                      onClick={() =>
                        (window.location.href = "mailto:ipsa@iitrpr.ac.in")
                      }
                    >
                      ipsa@iitrpr.ac.in
                    </span>
                    ,{" "}
                    <span
                      className="cursor-pointer text-blue-700 font-normal"
                      onClick={() =>
                        (window.location.href = "mailto:puneet@iitrpr.ac.in")
                      }
                    >
                      puneet@iitrpr.ac.in
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
