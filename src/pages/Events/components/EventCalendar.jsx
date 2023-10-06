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

  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // onActiveStartDateChange 함수를 사용하여 활성 날짜 범위 변경 이벤트를 처리합니다.
  const changeMonth = () => {
    console.log("해피해피해피")
  }

  return (
    <div className="EventCalendar">
      <Calendar
        // locale="en-US"
        onActiveStartDateChange={changeMonth}
        formatMonth={(locale, date) => moment(date).format("MM")}
        formatDay={(locale, date) => moment(date).format("D")}
        tileDisabled={tileDisabled}
      ></Calendar>
    </div>
  );
};

export default EventCalendar;
