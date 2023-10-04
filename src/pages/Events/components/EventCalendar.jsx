import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/eventCalendar.css"
import moment from "moment";
// import "../styles/eventCalendar.module.css";

const tileDisabled = ({ activeStartDate, date, view }) => {
  if (view === "month") {
    const currentMonth = activeStartDate.getMonth();
    return date.getMonth() !== currentMonth;
  }
  return false;
};

const EventCalendar = () => {
  return (
    <div className="EventCalendar">
      <Calendar
        // locale="en-US"
        formatMonth={(locale, date) => moment(date).format("MM")}
        formatDay={(locale, date) => moment(date).format("D")}
        tileDisabled={tileDisabled}
      ></Calendar>
    </div>
  );
};

export default EventCalendar;
