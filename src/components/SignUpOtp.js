import React from 'react';
import { LockClosedIcon, BellIcon  } from '@heroicons/react/solid';
import iit_ropar_logo from "../images/iit-ropar-logo.jpg";

function SignUpOtp(props){
    return(
        <div>
            
      {/* component */}
      <div className="absolute w-full top-0 mt-24">
        <div className="h-screen absolute top-0 w-full bg-[#1E3A8A]" style={{backgroundImage: 'url("https://demos.creative-tim.com/tailwindcss-starter-project/static/media/register_bg_2.2fee0b50.png")', backgroundSize: '100%', backgroundRepeat: 'no-repeat'}} />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4 pt-32">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className='mb-5'>
                    <img
                      className="mx-auto h-55 w-48"
                      src={iit_ropar_logo}
                      alt="IIT Ropar logo"
                    />
                  </div>
                  <div className="text-center mb-3">
                    <h1 className="text-gray-600 text-xl font-bold">Sign Up</h1>
                  </div>
                  {/* <div className="btn-wrapper text-center">
                    <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{transition: 'all 0.15s ease 0s'}}><img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/tailwindcss-starter-project/static/media/github.4ffd4fe7.svg" />Github</button>
                    <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{transition: 'all 0.15s ease 0s'}}><img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/tailwindcss-starter-project/static/media/google.87be59a1.svg" />Google</button>
                  </div> */}
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  
                  <div className="text-gray-500 text-center mb-3 font-bold">
                        <span>
                            <BellIcon className='inline h-5 w-5 mx-1 text-red-500 group-hover:text-indigo-400'/>
                        </span>
                        <small className="text-red-700">OTP has been sent to your mail account.</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3 mt-4">
                        <input
                    id="otp"
                    name="otp"
                    type="text"
                    autoComplete="otp"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="OTP"
                    />
                    </div>
                    {/* <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                      <input type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{transition: 'all 0.15s ease 0s'}} />
                    </div> */}
                    {/* <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input id="customCheckLogin" type="checkbox" className="form-checkbox text-gray-800 ml-1 w-5 h-5" style={{transition: 'all 0.15s ease 0s'}} /><span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                    </div> */}
                    <div className="text-center mt-6">
                      <button onClick={() => props.decreaseFlag()} className="bg-[#1E3A8A] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" type="button" style={{transition: 'all 0.15s ease 0s'}}>Validate</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2"><a href="#pablo" className="text-gray-300"><small>Forgot password?</small></a></div>
                <div className="w-1/2 text-right"><a href="#pablo" className="text-gray-300"><small>Create new account</small></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}



export default SignUpOtp;