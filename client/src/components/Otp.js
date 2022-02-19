import { LockClosedIcon, BellIcon  } from '@heroicons/react/solid';
import { render } from '@testing-library/react';
import React from 'react';

export default function Otp () {

  return (
    <>
        <div className='flex text-center justify-center'>
            <span>
                <BellIcon className='h-5 w-5 mx-1 text-red-500 group-hover:text-indigo-400'/>
            </span>
            <p className="mb-5 text-sm text-red-700 font-medium">
                OTP has been sent to your mail account.
            </p>
        </div>
        <form className="space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="my-2 rounded shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
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
              {/* <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="otp"
                  autoComplete="current-otp"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="OTP"
                />
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                
                Validate
              </button>
            </div>
        </form>
    </>
  )
}