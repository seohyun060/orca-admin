import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/setEventDateCalendar.css";
import moment, { months } from "moment";

const SetEventDateCalendar = (props) => {
  const { setIsClose, eventDate, setEventDate } = props;

  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === "month") {
      const currentMonth = activeStartDate.getMonth();
      return date.getMonth() !== currentMonth;
    }
    return false;
  };

  const handleDateChange = (selectedDate) => {
    const newDate = moment(selectedDate).format("YYYY-MM-DD");
    setEventDate(newDate);
    setIsClose(false);
  };

  return (
    <div className="SetEventDateCalendar">
      <Calendar
        onChange={(e) => handleDateChange(e)}
        value={eventDate}
        // locale="en-US"
        formatMonth={(locale, date) => moment(date).format("MM")}
        formatDay={(locale, date) => moment(date).format("D")}
        tileDisabled={tileDisabled}
      ></Calendar>
    </div>
  );
};

export default SetEventDateCalendar;
