import React from "react";
import spinner from "../../images/SpinnerWhite.gif";

export default function SignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onClick();
  };

  return (
    <>
      {props.colorChange === 0 && (
        <p
          className={
            "mb-10 h-10 text-center text-sm font-semibold text-[#4b70d1]"
          }
        >
          {props.msg}
        </p>
      )}
      {props.colorChange === 1 && (
        <p
          className={
            "mb-10 h-10 text-center text-sm font-semibold text-[#FC4F4F]"
          }
        >
          {props.msg}
        </p>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="my-2 rounded shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={props.updateData}
            />
          </div>
        </div>

        <div>
          {!props.isLoading ? (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get OTP
            </button>
          ) : (
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled
            >
              <div className="w-20 h-5">
                <img className="h-5 w-5 mx-auto" alt="spinner" src={spinner} />
              </div>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
