import React, { useState } from "react";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";  
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import format from "date-fns/format";

function DatePick(props) { 
  return (
    <div>
      <input
        type="date"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={e=>props.onChange(e.target.value)}
        required
      />
    </div>
  );
}


export default DatePick;
