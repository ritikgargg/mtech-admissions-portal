import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import pic from "../../images/iit-ropar-logo.jpg";

const navigation = [
  { name: "Home", to: "/" },
  { name: "How to Apply", to: "/how-to-apply" },
  { name: "Openings", to: "/courses" },
  { name: "More Info", to: "/info" },
  { name: "FAQs", to: "/faqs" },
  { name: "Contact us", to: "/contact-us" },
  { name: "Team", to: "/meet-the-team" },
];

function Navbar() {
  return (
    <div>
      <Popover>
        <div className="relative pt-6 px-4 mb-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center sm:h-10 justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow-0 flex-shrink-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="font-medium text-gray-500 hover:text-indigo-500"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/sign-in"
                className="font-medium text-gray-500 hover:text-indigo-500"
              >
                Sign-in
              </Link>
              <Link
                to="/sign-up"
                className="font-medium text-gray-500 hover:text-indigo-500"
              >
                Sign-up
              </Link>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={pic} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-500 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/sign-in"
                className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-50 hover:text-indigo-500 hover:bg-gray-100"
              >
                Sign-in
              </Link>
              <Link
                to="/sign-up"
                className="block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-50 hover:text-indigo-500 hover:bg-gray-100"
              >
                Sign-up
              </Link>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

export default Navbar;
