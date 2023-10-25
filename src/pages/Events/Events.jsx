import React, { useState, useEffect } from "react";
import moment from "moment";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import EventsDashboard from "./components/EventsDashboard";
import MapContainer from "./components/MapContainer";

import SetEventDateCalendar from "./components/SetEventDateCalendar";

import "./styles/events.css";
import images from "src/assets/images";

import EventDummyData from "./EventDummyData.json";

import {
  getAllEventData,
  getOneEventData,
  deleteOneEventData,
} from "src/api/eventsAPI";

const Events = () => {
  const today = moment().format("YYYY-MM-DD");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPast, setIsPast] = useState(true);

  // Form Data
  const [eventsData, setEventsData] = useState();

  const [selectedMain, setSelectedMain] = useState(null);
  const [articleTitle, setArticleTitle] = useState();
  const [isStartDateClick, setIsStartDateClick] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(today);
  const [isEndDateClick, setIsEndDateClick] = useState(false);
  const [eventEndDate, setEventEndDate] = useState(today);
  const [isAlldayChecked, setIsAlldayChecked] = useState(true);
  const [eventVenue, setEventVenue] = useState();
  const [eventOpeningHoursHour, setEventOpeningHoursHour] = useState();
  const [eventOpeningHoursMinute, setEventOpeningHoursMinute] = useState();
  const [relatedWebsite, setRelatedWebsite] = useState();

  const [eventPurpose, setEventPurpose] = useState();
  const [eventExplanation, setEventExplanation] = useState();
  const [eventLatitude, setEventLatitude] = useState();
  const [eventLongitude, setEventLongitude] = useState();

  const [eventDetailImg, setEventDetailImg] = useState([{ id: 1, file: null }]);
  const [eventGalleryImg, setEventGalleryImg] = useState([
    { id: 1, file: null },
  ]);

  console.log("id:", isFormOpen);

  const initEventdata = () => {
    getAllEventData().then((data) => {
      console.log(data);
      setEventsData(data.data);
    });
  };

  const uploadMainHandler = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMain(file);
    }
  };

  const onAlldayClick = () => {
    setIsAlldayChecked(!isAlldayChecked);
  };

  const uploadGalleryHandler = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      setEventGalleryImg((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? { ...input, file: file } : input
        )
      );
    }
  };

  const addGalleryButtonClick = () => {
    const newId = eventGalleryImg[eventGalleryImg.length - 1].id + 1;
    setEventGalleryImg([...eventGalleryImg, { id: newId, file: null }]);
  };

  const removeGalleryButtonClick = (id) => {
    setEventGalleryImg((prevInputs) =>
      prevInputs.filter((input) => input.id !== id)
    );
  };

  const uploadDetailHandler = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      setEventDetailImg((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? { ...input, file: file } : input
        )
      );
    }
  };

  const addDetailButtonClick = () => {
    const newId = eventDetailImg[eventDetailImg.length - 1].id + 1;
    setEventDetailImg([...eventDetailImg, { id: newId, file: null }]);
  };

  const removeDetailButtonClick = (id) => {
    setEventDetailImg((prevInputs) =>
      prevInputs.filter((input) => input.id !== id)
    );
  };

  useEffect(() => {
    initEventdata();
  }, []);

  useEffect(() => {
    if (isFormOpen) {
      console.log(isFormOpen);
      getOneEventData(isFormOpen).then((data) => {
        console.log(data);
        const eventData = data.data;

        setIsPast(eventData.isEnded);
        setSelectedMain({ name: eventData.thumbnail });
        setArticleTitle(eventData.title);
        const startDate = moment(eventData.startDate).format("YYYY-MM-DD");
        setEventStartDate(startDate);
        const endDate = moment(eventData.endDate).format("YYYY-MM-DD");
        setEventEndDate(moment(eventData.endDate).format("YYYY-MM-DD"));
        if (startDate !== endDate) {
          setIsAlldayChecked(false);
        }
        setEventVenue(eventData.venue);
        setEventOpeningHoursHour(eventData.openingHour.split(":")[0]);
        setEventOpeningHoursMinute(eventData.openingHour.split(":")[1]);

        setRelatedWebsite(eventData.relatedWebsite);
        setEventPurpose(eventData.purpose);
        setEventExplanation(eventData.explanation);

        if (eventData.mainImages.length !== 0) {
          const imageArray = [];
          eventData.mainImages.map((data, idx) => {
            imageArray.push({ id: idx, file: { name: data } });
          });
          setEventDetailImg(imageArray);
        }

        if (eventData.galleries.length !== 0) {
          const imageArray = [];
          eventData.galleries.map((data, idx) => {
            imageArray.push({ id: idx, file: { name: data } });
          });
          setEventGalleryImg(imageArray);
        }

        setEventLatitude(eventData.latitude);
        setEventLongitude(eventData.longitude);
      });
    }
  }, [isFormOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 이벤트를 무시하도록 기본 동작을 막음
    }
  };

  console.log(selectedMain);
  console.log(eventDetailImg);

  return (
    <div className="Layout">
      <div className="EventUpperBar">
        <div className="title semi24">이벤트 페이지</div>
        {!isFormOpen ? (
          <button className="ApplyButton" onClick={() => setIsFormOpen(true)}>
            새로 추가
          </button>
        ) : (
          <button className="ApplyButton" onClick={() => setIsFormOpen(false)}>
            입력 취소
          </button>
        )}
      </div>
      {eventsData && (
        <EventsDashboard eventData={eventsData} setIsFormOpen={setIsFormOpen} />
      )}
      {isFormOpen ? (
        <form onsubmit="return false">
          <div className="EventInputLayout">
            <div className="EventInputLayoutUpperBar">
              <div className="EventSelectButtonSet">
                <button
                  className={isPast.toString()}
                  onClick={() => setIsPast(true)}
                >
                  종료된 이벤트
                </button>
                <button
                  className={(!isPast).toString()}
                  onClick={() => setIsPast(false)}
                >
                  예정 이벤트
                </button>
              </div>
              <button
                className="SaveButton"
                onClick={() => {
                  for (let i = 25; i <= 84; i++) {
                    deleteOneEventData(i);
                  }
                }}
              >
                적용
              </button>
            </div>
            <label className="EventImageInput">
              <div className="UploadImageSpace">
                <img src={images.upload} alt="Upload" />
              </div>
              <div htmlFor="imagePath">
                {selectedMain ? (
                  <div className="imagePath">{selectedMain.name}</div>
                ) : (
                  <div className="imagePath">Event Image</div>
                )}
              </div>
              <input
                type="file"
                id="mainInput"
                onChange={(e) => uploadMainHandler(e)}
                style={{ display: "none" }}
                onKeyDown={handleKeyDown}
              />
            </label>
            <div className="EventTitleInput">
              <div className="ArticleTitle">이벤트 제목</div>
              <textarea
                name="title"
                className="ArticleInputArea"
                placeholder="Text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>
            <div className="EventPeriodInput">
              <div className="ArticleTitle">이벤트 날짜</div>
              <div className="EventPeriodSetting">
                <div className="EventStartDate">
                  <div
                    className="clickLayout"
                    onClick={() => setIsStartDateClick(!isStartDateClick)}
                  >
                    <img src={images.smallcalendar} />
                    시작날짜:
                    <input
                      name="startDate"
                      value={eventStartDate}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  {isStartDateClick ? (
                    <SetEventDateCalendar
                      setIsClose={setIsStartDateClick}
                      eventDate={eventStartDate}
                      setEventDate={setEventStartDate}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="EventEndDate">
                  <div
                    className="clickLayout"
                    onClick={() => setIsEndDateClick(!isEndDateClick)}
                  >
                    <img src={images.smallcalendar} />
                    종료날짜:
                    <input
                      name="endDate"
                      value={isAlldayChecked ? eventStartDate : eventEndDate}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  {isEndDateClick ? (
                    <SetEventDateCalendar
                      setIsClose={isAlldayChecked ? true : setIsEndDateClick}
                      eventDate={
                        isAlldayChecked ? eventStartDate : eventEndDate
                      }
                      setEventDate={isAlldayChecked ? null : setEventEndDate}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="EventDateAllday">
                  {!isAlldayChecked ? (
                    <input
                      type="checkbox"
                      checked={isAlldayChecked}
                      onClick={(e) => onAlldayClick()}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <img
                      src={images.checkbox}
                      checked={isAlldayChecked}
                      onClick={(e) => onAlldayClick()}
                    />
                  )}
                  <div>하루종일</div>
                </div>
              </div>
              <div className="EventPeriodDetail">
                <div className="EventPeriodDetailElement">
                  <div className="title">Venue</div>
                  <input
                    name="venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {!isAlldayChecked ? (
                  <div className="EventPeriodDetailElement">
                    <div className="title">Opening Hours</div>
                    <div className="EventPeriodDetailTime">
                      <input
                        type="number"
                        placeholder="Hour"
                        min="0"
                        max="23"
                        value={eventOpeningHoursHour}
                        onChange={(e) =>
                          setEventOpeningHoursHour(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                      />
                      <input
                        type="number"
                        placeholder="Minute"
                        min="0"
                        max="59"
                        value={eventOpeningHoursMinute}
                        onChange={(e) =>
                          setEventOpeningHoursMinute(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="EventPeriodDetailElement">
                  <div className="title">Related Website</div>
                  <div className="EventLinkInput">
                    <img src={images.link} />
                    <input
                      name="relatedWebsite"
                      value={relatedWebsite}
                      onChange={(e) => setRelatedWebsite(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="EventPurposeInput">
              <div className="ArticleTitle">Event Purpose</div>
              <textarea
                name="purpose"
                className="ArticleInputArea"
                placeholder="Text"
                value={eventPurpose}
                onChange={(e) => setEventPurpose(e.target.value)}
              />
            </div>
            <div className="EventExplanationsInput">
              <div className="ArticleTitle">Detailed Explanation</div>
              <textarea
                name="explanation"
                className="ArticleInputArea"
                placeholder="Text"
                value={eventExplanation}
                onChange={(e) => setEventExplanation(e.target.value)}
              />
              {/* 이미지 목록 첨부 필요 */}
              {eventDetailImg.map((input, index) => (
                <div className="EventImageSet">
                  <label className="EventImageInput">
                    <div className="UploadImageSpace">
                      <img src={images.upload} alt="Upload" />
                    </div>
                    <div htmlFor="imagePath">
                      {input.file ? (
                        <div className="imagePath">{input.file.name}</div>
                      ) : (
                        <div className="imagePath">Event Image</div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="mainInput"
                      onChange={(e) => uploadDetailHandler(input.id, e)}
                      style={{ display: "none" }}
                      onKeyDown={handleKeyDown}
                    />
                  </label>
                  {input.id !== eventDetailImg[eventDetailImg.length - 1].id ? (
                    <img
                      src={images.removeform}
                      onClick={() => removeDetailButtonClick(input.id)}
                      F
                    />
                  ) : (
                    <img
                      src={images.addform}
                      onClick={() => addDetailButtonClick()}
                    />
                  )}
                </div>
              ))}
            </div>
            {eventLatitude && (
              <MapContainer
                latitude={eventLatitude}
                longitude={eventLongitude}
              />
            )}
            {isPast ? (
              <div className="EventGalleryInput">
                <div className="title">Gallery</div>
                {/* 이미지 목록 첨부 필요 */}
                {eventGalleryImg.map((input, index) => (
                  <div className="EventImageSet">
                    <label className="EventImageInput">
                      <div className="UploadImageSpace">
                        <img src={images.upload} alt="Upload" />
                      </div>
                      <div htmlFor="imagePath">
                        {input.file ? (
                          <div className="imagePath">{input.file.name}</div>
                        ) : (
                          <div className="imagePath">Event Image</div>
                        )}
                      </div>
                      <input
                        type="file"
                        sc
                        id="mainInput"
                        onChange={(e) => uploadGalleryHandler(input.id, e)}
                        style={{ display: "none" }}
                        onKeyDown={handleKeyDown}
                      />
                    </label>
                    {input.id !==
                    eventGalleryImg[eventGalleryImg.length - 1].id ? (
                      <img
                        src={images.removeform}
                        onClick={() => removeGalleryButtonClick(input.id)}
                      />
                    ) : (
                      <img
                        src={images.addform}
                        onClick={() => addGalleryButtonClick()}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Events;
