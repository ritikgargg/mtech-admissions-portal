import { useLocation } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import LogoutPic from "../../images/power-off.png";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation().pathname;

  return (
    <nav className="bg-gradient-to-tr from-[#000000] to-[#090909] md:ml-64 py-6 px-3">
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
          <h4 className="uppercase text-white font-bold text-sm tracking-wider mt-1">
            {location.split("/")[2] === "dashboard"
              ? "Dashboard"
              : location.split("/")[2] === "manage-admins"
              ? "Admins"
              : "Admissions"}
            {/* {location === "/"
              ? "DASHBOARD"
              : location.toUpperCase().replace("/", "")} */}
          </h4>
          <Tooltip title="Logout">
            <Link className="ml-auto" to="/logout">
              <img alt="Logout" src={LogoutPic} className="w-6 h-6" />
            </Link>
          </Tooltip>
          {/* <div className="flex">
            <NavbarInput placeholder="Search" />

            <div className="mr-4 ml-6">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-12">
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: "transparent",
                }}
              >
                <DropdownItem color="lightBlue">Action</DropdownItem>
                <DropdownItem color="lightBlue">Another Action</DropdownItem>
                <DropdownItem color="lightBlue">Something Else</DropdownItem>
              </Dropdown>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
