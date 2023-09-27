import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment, { months } from "moment";

const tileDisabled = ({ activeStartDate, date, view }) => {
  if (view === "month") {
    const currentMonth = activeStartDate.getMonth();
    return date.getMonth() !== currentMonth;
  }
  return false;
};

const handleDateChange = (selectedDate) => {
  
};

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        // locale="en-US"
        formatMonth={(locale, date) => moment(date).format("MM")}
        formatDay={(locale, date) => moment(date).format("D")}
        tileDisabled={tileDisabled}
      ></Calendar>
    </div>
  );
};

export default EventCalendar;
