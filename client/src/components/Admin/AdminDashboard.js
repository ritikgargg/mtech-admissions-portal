import React, { useState } from "react";
import ChartBar from "./ChartBar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AdminDashboard() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    
    console.log("open", open);

    const handleClick = (event) => {
        console.log("clicked");
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        console.log("closed");
        setAnchorEl(null);
        setOpen(false);
    };
    // const [isOpenAdmissionCycle, setOpenAdmissionCycle] = useState(false);

    // const admissionCycles = [
    //     {
    //         value: "Admission Cycles 2022-23",
    //         label: "Admission Cycles 2022-23"
    //     },
    //     {
    //         value: "Admission Cycles 1922-23",
    //         label: "Admission Cycles 1922-23"
    //     },
    //     {
    //         value: "Admission Cycles 1822-23",
    //         label: "Admission Cycles 1822-23"
    //     }
    // ]

  return (
    <div className="bg-gray-100">
        {/* Filter div */}
        <div className="flex justify-around items-center h-40 border border-red-900">

            {/* Admission Cycles Filter */}
            <div 
                id="basic-button"
                className="flex justify-between p-4 items-center bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>

                {/* Display Content */}
                <div>
                    <h2 className="font-semibold text-lg">Admission Cycles</h2>
                    <p className="text-gray-500">2 Cycles Selected</p>
                </div>                

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>

            </div>

            {/* Offerings Filter */}
            <div className="bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100">
                <div className="m-4">
                    <h2 className="font-semibold text-lg">Offerings</h2>
                    <p className="text-gray-500">3 Offerings Selected</p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100">
                <div className="m-4">
                    <h2 className="font-semibold text-lg">Categories</h2>
                    <p className="text-gray-500">5 Categories Selected</p>
                </div>
            </div>

        </div>

        <div className="px-3 md:px-8 mt-12">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4">
                        {/* <ChartLine /> */}
                        <ChartBar />
                    </div>
                    {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                        <ChartBar />
                    </div> */}
                </div>
            </div>
        </div>

        {/* <div className="px-3 md:px-8">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                    <StatusCard
                        color="pink"
                        icon="trending_up"
                        title="Traffic"
                        amount="350,897"
                        percentage="3.48"
                        percentageIcon="arrow_upward"
                        percentageColor="green"
                        date="Since last month"
                    />
                    <StatusCard
                        color="orange"
                        icon="groups"
                        title="New Users"
                        amount="2,356"
                        percentage="3.48"
                        percentageIcon="arrow_downward"
                        percentageColor="red"
                        date="Since last week"
                    />
                    <StatusCard
                        color="purple"
                        icon="paid"
                        title="Sales"
                        amount="924"
                        percentage="1.10"
                        percentageIcon="arrow_downward"
                        percentageColor="orange"
                        date="Since yesterday"
                    />
                    <StatusCard
                        color="blue"
                        icon="poll"
                        title="Performance"
                        amount="49,65%"
                        percentage="12"
                        percentageIcon="arrow_upward"
                        percentageColor="green"
                        date="Since last month"
                    />
                </div>
            </div>
        </div> */}

        {/* <div className="px-3 md:px-8 h-auto">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                        <PageVisitsCard />
                    </div>
                    <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                        <TrafficCard />
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  );
}