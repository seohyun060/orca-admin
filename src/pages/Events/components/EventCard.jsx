import React from "react";

const EventCard = (props) => {
  const { data, setIsFormOpen } = props;

  // console.log(eventDate)

  const startDate = new Date(data.eventDate.startDate);
  const startDateForm = startDate.getMonth() + 1 + "." + startDate.getDate();
  const endDate = new Date(data.eventDate.endDate);
  const endDateForm = endDate.getMonth() + 1 + "." + endDate.getDate();

  return (
    <article className="EventCardLayout" onClick={() => setIsFormOpen(data.id)}>
      <div className="EventCardTitle">{data.title}</div>
      <div className="EventCardPeriod">
        <div className="year">{startDate.getFullYear()}</div>
        <div className="days">
          {startDateForm} - {endDateForm}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
