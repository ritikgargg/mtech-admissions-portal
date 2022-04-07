import React from "react"
import member1Image from "../../images/Anshul Verma.jfif"
import member2Image from "../../images/Piyush Presannan.jpg"
import member3Image from "../../images/Ritik Garg.jpg"
import member4Image from "../../images/Tarun Singla.jpg"

export default function MeetTheTeam(){
    return(
        <div>
        {/* MDI Icons */}
        <link rel="stylesheet" href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css" />
        {/* Page Container */}
        <div className="flex items-center justify-center min-h-screen bg-white py-48">
          <div className="flex flex-col">
            {/* Notes */}
            {/* <span className="text-center font-bold my-10 opacity-30">
              MDI (npm i @mdi/font) reuqired for all icons
              <hr className="my-4" />
              <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" className="text-blue-600">
                Convetert to SASS
              </a>
            </span> */}
            <div className="flex flex-col mt-8">
              {/* Meet the Team */}
              <div className="container max-w-7xl px-4">
                {/* Section Header */}
                <div className="flex flex-wrap justify-center text-center mb-24">
                  <div className="w-full lg:w-6/12 px-4">
                    {/* Header */}
                    <h1 className="text-gray-900 text-4xl font-bold mb-8">
                      Meet the Team
                    </h1>
                    {/* Description */}
                    <p className="text-gray-700 text-lg font-light">
                      With over 100 years of combined experience, we've got a well-seasoned team at the helm.
                    </p>
                  </div>
                </div>
                {/* Team Members */}
                <div className="flex flex-wrap">
                  {/* Member #1 */}
                  <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                    <div className="flex flex-col">
                      {/* Avatar */}
                      <div className="mx-auto">
                        <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100" alt="Anshul Verma" src={member1Image} />
                      </div>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Anshul Verma
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Founder &amp; Specialist
                        </div>
                        {/* Social Icons */}
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                          {/* Linkedin */}
                          <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                            <i className="mdi mdi-linkedin text-indigo-500 mx-auto mt-2" />
                          </a>
                          {/* Twitter */}
                          <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                            <i className="mdi mdi-twitter text-blue-300 mx-auto mt-2" />
                          </a>
                          {/* Instagram */}
                          <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
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
                        <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100" alt="Piyush Presannan" src={member2Image} />
                      </div>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Piyush Presannan
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          M. Specialist
                        </div>
                        {/* Social Icons */}
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                          {/* Linkedin */}
                          <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                            <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                          </a>
                          {/* Twitter */}
                          <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                            <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2" />
                          </a>
                          {/* Instagram */}
                          <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
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
                        <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100" alt="Ritik Garg" src={member3Image} />
                      </div>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Ritik Garg
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Team Member
                        </div>
                        {/* Social Icons */}
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                          {/* Linkedin */}
                          <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                            <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                          </a>
                          {/* Twitter */}
                          <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                            <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2" />
                          </a>
                          {/* Instagram */}
                          <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
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
                        <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100" alt="Tarun Singla" src={member4Image} />
                      </div>
                      {/* Details */}
                      <div className="text-center mt-6">
                        {/* Name */}
                        <h1 className="text-gray-900 text-xl font-bold mb-1">
                          Tarun Singla
                        </h1>
                        {/* Title */}
                        <div className="text-gray-700 font-light mb-2">
                          Team Member
                        </div>
                        {/* Social Icons */}
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100
                                transition-opacity duration-300">
                          {/* Linkedin */}
                          <a href="#" className="flex rounded-full hover:bg-indigo-50 h-10 w-10">
                            <i className="mdi mdi-linkedin text-indigo-700 mx-auto mt-2" />
                          </a>
                          {/* Twitter */}
                          <a href="#" className="flex rounded-full hover:bg-blue-50 h-10 w-10">
                            <i className="mdi mdi-twitter text-blue-400 mx-auto mt-2" />
                          </a>
                          {/* Instagram */}
                          <a href="#" className="flex rounded-full hover:bg-orange-50 h-10 w-10">
                            <i className="mdi mdi-instagram text-orange-400 mx-auto mt-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}