import React from "react";
import "react-datepicker/dist/react-datepicker.css";

function DatePick(props) { 
  return (
    <div>
      <input
        type="date"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={props.onChange}
        defaultValue = {props.defaultValue}
        required
      />
    </div>
  );
}


export default DatePick;
