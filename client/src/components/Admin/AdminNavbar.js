import { useLocation } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import LogoutPic from "../../images/power-off.svg";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation().pathname;

  return (
    <nav className="do-not-print-me bg-gradient-to-tr from-[#000000] to-[#090909] md:ml-64 py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className=" text-white font-bold text-lg tracking-wider mt-1">
            {location.split("/")[2] === "dashboard"
              ? "Dashboard"
              : location.split("/")[2] === "manage-admins"
              ? "Admins"
              : location.split("/")[2] === "profile"
              ? "Profile"
              : location.split("/")[2] === "templates"
              ? "Templates"
              : location.split("/")[2] === "how-to-use"
              ? "How To Use?"
              : location.split("/")[2] === "archive"
              ? "Archive"
              : "Admissions"}
          </h4>
          <Disclosure as="nav">
            {({ open }) => (
              <>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img alt="Logout" src={LogoutPic} className="w-6 h-6" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/logout">
                            <Disclosure.Button
                              className={classNames(
                                active
                                  ? "bg-gray-100 focus:outline-none w-full text-left"
                                  : "",
                                "block px-4 py-2 text-sm text-gray-700 focus:outline-none w-full text-left"
                              )}
                            >
                              Sign out
                            </Disclosure.Button>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </nav>
  );
}
