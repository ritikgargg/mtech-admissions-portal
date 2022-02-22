import React from 'react';
import DashboardNavBar from './DashboardNavBar';

function MyApplications(props){
    return(
        <>
        <DashboardNavBar currentFlag={1} user={props.user}/>
        <div>MyApplications</div>
        </>
    );
}

export default MyApplications;