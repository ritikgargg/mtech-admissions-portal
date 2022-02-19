import React from "react";
import "../App.css";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
function DatePicker() {
  return (
    <div>
      <DatePickerComponent placeholder="Enter Date"></DatePickerComponent>
    </div>
  );
}

export default DatePicker;
