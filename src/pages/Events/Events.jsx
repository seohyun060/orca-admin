import React, { useState } from "react";

import EventsDashboard from "./components/EventsDashboard";
import MapContainer from "./components/MapContainer";

import "./styles/events.css";
import images from "src/assets/images";

const Events = () => {
  const [isPast, setIsPast] = useState(true);
  const [selectedMain, setSelectedMain] = useState(null);
  const [place, setPlace] = useState(null);

  const uploadMainHandler = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMain(file);
    }
  };

  return (
    <div className="Layout">
      <div className="EventUpperBar">
        <div className="title semi24">이벤트 페이지</div>
        <button className="ApplyButton">새로 추가</button>
      </div>
      <EventsDashboard />
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
          <label htmlFor="imagePath">
            {selectedMain ? (
              <div className="imagePath">{selectedMain.name}</div>
            ) : (
              <div className="imagePath">Event Image</div>
            )}
          </label>
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
            <div className="EventStartDate"></div>
            <div className="EventEndDate"></div>
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
          <label className="EventImageInput">
            <div className="UploadImageSpace">
              <img src={images.upload} alt="Upload" />
            </div>
            <label htmlFor="imagePath">
              {selectedMain ? (
                <div className="imagePath">{selectedMain.name}</div>
              ) : (
                <div className="imagePath">Event Image</div>
              )}
            </label>
            <input
              type="file"
              id="mainInput"
              onChange={(e) => uploadMainHandler(e)}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="EventLocationInput">
          <div className="ArticleTitle">Location</div>
          <div className="EventLocationSearch">
            {/* 검색하여 지도 업데이트 하는 과정 추가필요 */}
            <input />
            <img src={images.search} />
          </div>
          <div className="EventMapContainer">
            <MapContainer />
          </div>
        </div>
        <div className="EventGalleryInput">
          <div className="title">Gallery</div>
          {/* 이미지 목록 첨부 필요 */}
          <label className="EventImageInput">
            <div className="UploadImageSpace">
              <img src={images.upload} alt="Upload" />
            </div>
            <label htmlFor="imagePath">
              {selectedMain ? (
                <div className="imagePath">{selectedMain.name}</div>
              ) : (
                <div className="imagePath">Event Image</div>
              )}
            </label>
            <input
              type="file"
              id="mainInput"
              onChange={(e) => uploadMainHandler(e)}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Events;
