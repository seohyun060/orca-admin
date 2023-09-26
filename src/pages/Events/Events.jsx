import React from "react";

import EventsDashboard from "./components/EventsDashboard";
import "./styles/events.css";

const Events = () => {
  return (
    <div className="Layout">
      <div className="EventUpperBar">
        <div className="title semi24">이벤트 페이지</div>
        <button className="ApplyButton">새로 추가</button>
      </div>
      <EventsDashboard />
    </div>
  );
};

export default Events;
