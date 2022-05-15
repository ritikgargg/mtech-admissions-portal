import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer.js";

import { Outlet } from "react-router";

function WithHeaderFooter() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default WithHeaderFooter;
