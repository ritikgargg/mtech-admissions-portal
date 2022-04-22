import React from "react"
import { Tooltip } from "@mui/material";
import fileSaver from 'file-saver';
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";

export default function MeritListGeneration(props) {
    const navigate = useNavigate();

    function get_merit_list(){
        Axios.get("/get-merit-list", { 
            responseType: 'arraybuffer',
            headers: {
              Authorization: getToken(),
              cycle_id: props.cycle_id,
              offering_id: props.offering_id,
            },
          })
            .then((response) => {
              if (response.data === 1) {
                navigate("/logout");
              } else {
                var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                let fileName = "Merit_List_" + props.offeringName + "_" + props.cycleName;
                fileSaver.saveAs(blob, fileName);
              }
            })
            .catch((err) => console.log(err));
    }
    return(
        <div>
        <Tooltip title="Download Results">
            <button
                onClick={get_merit_list}
                type="button"
                className="focus:outline-none w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                </svg>
                    Results
                </button>
            </Tooltip>
        </div>

    );
    
}