import React from 'react';
import { Outlet } from 'react-router';

function WithoutHeaderFooter(){

    return(
        <Outlet />
    );

}
export default WithoutHeaderFooter;