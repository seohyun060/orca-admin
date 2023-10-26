import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/eventCalendar.css";
import moment from "moment";
// import "../styles/eventCalendar.module.css";

const EventCalendar = (props) => {
  const { eventData, onEventDataChange } = props;

  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const [eventDate, setEventDate] = useState(new Date());

  const dotColors = [
    "#FF66B2",
    "#9370DB",
    "#00CDCD",
    "#00FFAE",
    "#FFDD40",
    "#A020F0",
    "#1E90FF",
    "#FF8C00",
    "#FF5E5E",
    "#A9A9A9",
  ];

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
  };

  // onActiveStartDateChange 함수를 사용하여 활성 날짜 범위 변경 이벤트를 처리합니다.
  const changeMonth = (data) => {
    onEventDataChange(data.activeStartDate);
  };

  const tileContent = (date) => {
    let html = [];
    // 현재 날짜가 post 작성한 날짜 배열에 있다면, dot div 추가
    eventData.map((data, idx) => {
      if (
        moment(data.startDate).format("YYYY-MM-DD") <=
          moment(date).format("YYYY-MM-DD") &&
        moment(data.endDate).format("YYYY-MM-DD") >=
          moment(date).format("YYYY-MM-DD")
      ) {
        html.push(<div className="dot" style={{backgroundColor: dotColors[idx%10]}}></div>);
      }
    });

    return (
      <>
        <div className="dotContainer">{html}</div>
      </>
    );
  };

  return (
    <div className="EventCalendar">
      <Calendar
        value={eventDate}
        // onChange={(e) => handleDateChange(e)}
        onActiveStartDateChange={(data) => changeMonth(data)}
        formatMonth={(locale, date) => moment(date).format("MM")}
        formatDay={(locale, date) => moment(date).format("D")}
        tileDisabled={tileDisabled}
        tileContent={({ date }) => tileContent(date)}
      ></Calendar>
    </div>
  );
};

export default EventCalendar;
