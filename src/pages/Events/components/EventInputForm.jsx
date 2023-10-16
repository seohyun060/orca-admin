import React from "react";

const EventInputForm = () => {
  return (
    <div className="EventInputLayout">
      <div className="EventInputLayoutUpperBar">
        <div className="EventSelectButtonSet">
          <button className={isPast.toString()} onClick={() => setIsPast(true)}>
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
        <textarea
          className="ArticleInputArea"
          value={EventDummyData.data[isFormOpen - 1].title}
        />
      </div>
      <div className="EventPeriodInput">
        <div className="ArticleTitle">이벤트 날짜</div>
        <div className="EventPeriodSetting">
          <div className="EventStartDate">
            <div onClick={() => setIsStartDateClick(!isStartDateClick)}>
              시작날짜:{" "}
              {/* EventDummyData.data[isFormOpen - 1].eventDate.startDate */}
              {eventStartDate}
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
                  type="file"
                  sc
                  id="mainInput"
                  onChange={(e) => uploadGalleryHandler(input.id, e)}
                  style={{ display: "none" }}
                />
              </label>
              {input.id !== eventGalleryImg[eventGalleryImg.length - 1].id ? (
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
  );
};

export default EventInputForm;
