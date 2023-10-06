import React, { useState, useEffect } from "react";
import moment from "moment";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import EventsDashboard from "./components/EventsDashboard";
import MapContainer from "./components/MapContainer";

import SetEventDateCalendar from "./components/SetEventDateCalendar";

import "./styles/events.css";
import images from "src/assets/images";

const Events = () => {
  const today = moment().format("YYYY-MM-DD");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPast, setIsPast] = useState(true);
  const [isStartDateClick, setIsStartDateClick] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(today);
  const [isEndDateClick, setIsEndDateClick] = useState(false);
  const [eventEndDate, setEventEndDate] = useState(today);
  const [isAlldayChecked, setIsAlldayChecked] = useState(true);
  const [selectedMain, setSelectedMain] = useState(null);
  const [eventDetailImg, setEventDetailImg] = useState([{ id: 1, file: null }]);
  const [eventGalleryImg, setEventGalleryImg] = useState([
    { id: 1, file: null },
  ]);

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

  useEffect(() => {});

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
      <EventsDashboard />
      {isFormOpen ? (
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
            <button className="SaveButton">적용</button>
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
            />
          </label>
          <div className="EventTitleInput">
            <div className="ArticleTitle">이벤트 제목</div>
            <textarea className="ArticleInputArea" />
          </div>
          <div className="EventPeriodInput">
            <div className="ArticleTitle">이벤트 날짜</div>
            <div className="EventPeriodSetting">
              <div className="EventStartDate">
                <div onClick={() => setIsStartDateClick(!isStartDateClick)}>
                  시작날짜: {eventStartDate}
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
                <div onClick={() => setIsEndDateClick(!isEndDateClick)}>
                  종료날짜: {eventEndDate}
                </div>
                {isEndDateClick ? (
                  <SetEventDateCalendar
                    setIsClose={setIsEndDateClick}
                    eventDate={eventEndDate}
                    setEventDate={setEventEndDate}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="EventDateAllday">
                {/* <button>
                <img src={images.checkbox} />
              </button> */}
                {!isAlldayChecked ? (
                  <input
                    type="checkbox"
                    checked={isAlldayChecked}
                    onClick={(e) => onAlldayClick()}
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
                <input />
              </div>
              <div className="EventPeriodDetailElement">
                <div className="title">Opening Hours</div>
                <div className="EventPeriodDetailTime">
                  <input placeholder="Hour" />
                  <input placeholder="Minute" />
                </div>
              </div>
              <div className="EventPeriodDetailElement">
                <div className="title">Related Website</div>
                <div className="EventLinkInput">
                  <img src={images.link} />
                  <input />
                </div>
              </div>
            </div>
          </div>
          <div className="EventPurposeInput">
            <div className="ArticleTitle">Event Purpose</div>
            <textarea className="ArticleInputArea" placeholder="Text" />
          </div>
          <div className="EventExplanationsInput">
            <div className="ArticleTitle">Detailed Explanation</div>
            <textarea className="ArticleInputArea" placeholder="Text" />
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
                  />
                </label>
                {input.id !== eventDetailImg[eventDetailImg.length - 1].id ? (
                  <img
                    src={images.addform}
                    onClick={() => removeDetailButtonClick(input.id)}
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
          <MapContainer />
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
                      type="file"sc
                      id="mainInput"
                      onChange={(e) => uploadGalleryHandler(input.id, e)}
                      style={{ display: "none" }}
                    />
                  </label>
                  {input.id !==
                  eventGalleryImg[eventGalleryImg.length - 1].id ? (
                    <img
                      src={images.addform}
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Events;
