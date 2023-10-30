import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/setEventDateCalendar.css";
import moment, { months } from "moment";

const SetEventDateCalendar = (props) => {
  const { setIsClose, eventDate, setEventDate, preventDate } = props;

  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view === "month") {
      const currentMonth = activeStartDate.getMonth();
      return date.getMonth() !== currentMonth;
    }
    return false;
  };

  const handleDateChange = (selectedDate) => {
    console.log(preventDate, selectedDate)
    if (preventDate && moment(preventDate).isAfter(selectedDate)) {
      console.log("누르지마")
      setIsClose(false);
    } else {
      const newDate = moment(selectedDate).format("YYYY-MM-DD");
      setEventDate(newDate);
      setIsClose(false);
    }
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
