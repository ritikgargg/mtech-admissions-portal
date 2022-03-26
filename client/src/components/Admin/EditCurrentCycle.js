import React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";

export default function EditCurrentCycle () {
    return (
        <div>
            <Tooltip title="Edit">
                <button
                type="button"
                onClick={handleOpen}
                className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                >
                <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                    />
                </svg>
                </button>
            </Tooltip>
        </div>
    );
}