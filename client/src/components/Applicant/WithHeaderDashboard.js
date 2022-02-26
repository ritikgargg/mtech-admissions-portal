import React from 'react';
import DashboardNavBar from "./DashboardNavBar";

import { Outlet } from 'react-router';

function WithHeaderFooter(){

    return(
        <div>
            <DashboardNavBar user={{name: "Ritik", email: "ritikgarg2701@gmail.com", imageUrl: ""}}/>
            <Outlet />
        </div>
    );

}
export default WithHeaderFooter;