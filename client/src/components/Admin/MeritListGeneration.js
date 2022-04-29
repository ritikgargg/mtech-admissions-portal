import React from "react"
import { Tooltip } from "@mui/material";
import fileSaver from 'file-saver';
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from '@mui/icons-material/Assessment';

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
                className="focus:outline-none w-1/2 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
                >
                <AssessmentIcon fontSize="small" className="mr-1"/>
                    Results
                </button>
            </Tooltip>
        </div>

    );
    
}