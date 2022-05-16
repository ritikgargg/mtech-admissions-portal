import { useLocation } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { getAdminType } from "./AdminTypes";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

export default function AdminNavbarWithSidebar() {
  const location = useLocation().pathname;
  const [showSidebar, setShowSidebar] = useState("-left-64");
  var admin_type = getAdminType();

  function renderAdmin(param) {
    switch (param) {
      case "0":
        return "Admin";
      case "1":
        return "Faculty";
      default:
        return "Staff";
    }
  }

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            href="https://www.iitrpr.ac.in/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block"
          >
            <H6 color="gray">{renderAdmin(admin_type)} Portal</H6>
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/dashboard"
                  exact="true"
                  className={
                    location !== "/admin/dashboard"
                      ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                  }
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/admin/admission-cycles"
                  exact="true"
                  className={
                    !location.startsWith("/admin/admission-cycles") &&
                    !location.startsWith("/admin/offerings") &&
                    !location.startsWith("/admin/applications") &&
                    !location.startsWith("/admin/view")
                      ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                  }
                >
                  <CalendarTodayIcon size="2xl" />
                  Admissions
                </NavLink>
              </li>

              {admin_type === "0" && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    to="/admin/manage-admins"
                    exact="true"
                    className={
                      location !== "/admin/manage-admins"
                        ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                        : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                    }
                  >
                    <AdminPanelSettingsIcon size="2xl" />
                    Admins
                  </NavLink>
                </li>
              )}

              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/admin/templates"
                  exact="true"
                  className={
                    location !== "/admin/templates"
                      ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                  }
                >
                  <PostAddIcon size="2xl" />
                  Templates
                </NavLink>
              </li>

              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/admin/profile"
                  exact="true"
                  className={
                    location !== "/admin/profile"
                      ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                  }
                >
                  <AccountCircleIcon size="2xl" />
                  Profile
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/admin/how-to-use"
                  exact="true"
                  className={
                    location !== "/admin/how-to-use"
                      ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                  }
                >
                  <HelpOutlineIcon size="2xl" />
                  How To Use?
                </NavLink>
              </li>

              {admin_type === "0" && (
                <li className="rounded-lg mb-2 text-gray-700">
                  <NavLink
                    to="/admin/archive"
                    exact="true"
                    className={
                      location !== "/admin/archive"
                        ? "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                        : "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-[#000000] to-[#090909] text-white shadow-md"
                    }
                  >
                    <ArchiveOutlinedIcon size="2xl" />
                    Archive
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
