import React from "react";
import AdminNavbarWithSidebar from "./AdminNavbarWithSidebar";

import { Outlet } from "react-router";

function WithHeaderFooter() {
  return (
    <div>
      <AdminNavbarWithSidebar />
      <div className="md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default WithHeaderFooter;
