import React from "react";
import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props) {
  return (
    <div>
      <input
        type="date"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={props.onChange}
        value={props.value}
        required
      />
    </div>
  );
}

export default DatePicker;
