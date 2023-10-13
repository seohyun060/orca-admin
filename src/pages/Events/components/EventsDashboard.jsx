import React, { useState, useEffect, useRef } from "react";

import EventCalendar from "./EventCalendar";
import EventCard from "./EventCard";

import images from "src/assets/images";

const EventsDashboard = (props) => {
  const { eventData, setIsFormOpen } = props;

  const [monthData, setMonthData] = useState([]);

  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [eventSlideMoving, setEventSlideMoving] = useState(0);
  const eventSlideRef = useRef();
  const [dotBar, setDotBar] = useState([]);
  const totalSides = 2; // 추후 갯수만큼 불러오기 upper(event/6)

  const cardSize = 810 + 30;

  const onEventDataChange = (targetMonth) => {
    setMonthData(
      eventData.data.filter((data) => {
        const startMonth = new Date(data.eventDate.startDate).getMonth();
        const endMonth = new Date(data.eventDate.endDate).getMonth();
        if (startMonth == targetMonth || endMonth == targetMonth) {
          return true;
        }
      })
    );
  };

  const onBackButtonClick = () => {
    if (currentEventSlide <= 0) {
      return;
    } else {
      setEventSlideMoving(eventSlideMoving + cardSize);
      setCurrentEventSlide(currentEventSlide - 1);
      eventSlideRef.current.style.transform = `translateX(${
        eventSlideMoving + cardSize
      }px)`;
    }
  };
  const onGoButtonClick = () => {
    if (currentEventSlide >= totalSides - 1) {
      return;
    } else {
      setEventSlideMoving(eventSlideMoving - cardSize);
      setCurrentEventSlide(currentEventSlide + 1);
      eventSlideRef.current.style.transform = `translateX(${
        eventSlideMoving - cardSize
      }px)`;
    }
  };

  const makeDotbar = () => {
    let dotBarImage = [];
    for (var i = 0; i < totalSides; i++) {
      if (i == currentEventSlide) {
        dotBarImage.push(images.paging_dot_dark);
      } else {
        dotBarImage.push(images.paging_dot_medium);
      }
    }

    let temp = [];
    for (var i = 0; i < totalSides; i++) {
      temp.push(<img id={i} src={dotBarImage[i]}></img>);
    }
    setDotBar(temp);
  };

  useEffect(() => {
    eventSlideRef.current.style.transition = "transform 0.4s ease-in-out";
    onEventDataChange(new Date().getMonth());
  }, []);

  useEffect(() => {
    makeDotbar();
  }, [currentEventSlide]);

  return (
    <article className="EventsDashboard">
      <div className="EventsCalendar">
        <EventCalendar
          eventData={eventData}
          onEventDataChange={onEventDataChange}
        />
      </div>
      <div className="EventsList">
        {/* <img src={images.previous} onClick={onBackButtonClick}></img> */}
        <div className="CarouselProgress">
          <div className="EventsCarousel">
            <div className="EventsSlide" ref={eventSlideRef}>
              {monthData.map((data) => (
                <EventCard
                  data={data}
                  setIsFormOpen={setIsFormOpen}
                />
              ))}
            </div>
          </div>
          {/* <div className="dotbar">{dotBar}</div> */}
        </div>
        {/* <img src={images.next} onClick={onGoButtonClick}></img> */}
      </div>
    </article>
  );
};

export default EventsDashboard;
