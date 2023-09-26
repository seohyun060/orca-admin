import React from "react";

import Calendar from "./Calendar";
import EventCard from "./EventCard";

import images from "src/assets/images";

const EventsDashboard = () => {
  return (
    <article className="EventsDashboard">
      <div className="EventsCalendar">
        <Calendar></Calendar>
      </div>
      <div className="EventsList">
        <div className="EventsCarousel">
          <div className="EventsSlide">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventsDashboard;
