import React, { useState, useEffect } from "react";
import moment from "moment";

import EventsDashboard from "./components/EventsDashboard";
import MapContainer from "./components/MapContainer";

import SetEventDateCalendar from "./components/SetEventDateCalendar";

import "./styles/events.css";
import images from "src/assets/images";

import {
  getAllEventData,
  getOneEventData,
  postNewEventData,
  putOneEventData,
  deleteOneEventData,
} from "src/api/eventsAPI";

const Events = () => {
  const today = moment().format("YYYY-MM-DD");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPast, setIsPast] = useState(true);

  // Form Data
  const [eventsData, setEventsData] = useState();

  const [eventThumbnail, setEventThumbnail] = useState(null);
  const [eventTitle, setEventTitle] = useState();
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
  const [eventLocation, setEventLocation] = useState();
  const [eventLatitude, setEventLatitude] = useState();
  const [eventLongitude, setEventLongitude] = useState();

  const [eventDetailImg, setEventDetailImg] = useState([{ id: 1, file: null }]);
  const [eventGalleryImg, setEventGalleryImg] = useState([
    { id: 1, file: null },
  ]);

  const initEventdata = () => {
    getAllEventData().then((data) => {
      console.log(data);
      setEventsData(data.data);
    });
  };

  const uploadMainHandler = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setEventThumbnail(file);
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

  const onApplyEvent = async (e) => {
    if (eventTitle == null || eventTitle == "") {
      return;
    }
    e.preventDefault();

    const formData = new FormData(document.getElementById("eventForm"));

    formData.append("isEnded", isPast);
    console.log(eventThumbnail);
    if (eventThumbnail != null) {
      formData.append("thumbnail", eventThumbnail);
    }

    formData.append("isAllDay", isAlldayChecked);
    const openingHour =
      eventOpeningHoursHour >= 0 &&
      eventOpeningHoursHour <= 24 &&
      eventOpeningHoursMinute >= 0 &&
      eventOpeningHoursMinute <= 60
        ? moment()
            .add(eventOpeningHoursHour, "h")
            .add(eventOpeningHoursMinute, "m")
            .format("HH:mm")
        : "00:00";
    formData.append("openingHour", openingHour);

    console.log(eventDetailImg);
    eventDetailImg.map((data) => {
      if (data.file != null) {
        formData.append("mainImages", data.file);
      }
    });

    formData.append("location", eventLocation);
    formData.append("latitude", eventLatitude);
    formData.append("longitude", eventLongitude);

    console.log(eventGalleryImg);
    eventGalleryImg.map((data) => {
      if (data.file != null) {
        formData.append("galleries", data.file);
      }
    });

    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (isFormOpen === -1) {
      postNewEventData(formData).then((data) => {
        console.log(data);
        if (data.status !== 201) {
          alert("저장 실패!");
        } else {
          alert("저장 성공!");
        }
        window.location.reload();
      });
    } else if (isFormOpen > 0) {
      putOneEventData(isFormOpen, formData).then((data) => {
        console.log(data);
        if (data.status !== 201) {
          alert("수정 실패!");
        } else {
          alert("수정 성공!");
        }
        window.location.reload();
      });
    }
  };

  const deleteEvent = (e) => {
    e.preventDefault();
    deleteOneEventData(isFormOpen).then((data) => {
      console.log(data);
      if (data.status !== 200) {
        alert("삭제 실패!");
      } else {
        alert("삭제 성공!");
      }
      window.location.reload();
    });
  };

  const loadImage = async (imageUrl) => {
    let imageFile = null;
    // 이미지를 가져와 Blob으로 변환
    await fetch(imageUrl)
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Blob을 파일로 생성
        imageFile = new File([imageBlob], "Thumbnail_Image.jpg", {
          type: "image/jepg",
        });
      })

      .catch((error) => {
        console.error("이미지를 가져오는 중 오류 발생: ", error);
      });
    return imageFile;
  };

  const eventInputLayout = async () => {
    if (isFormOpen > 0) {
      console.log(isFormOpen);
      await getOneEventData(isFormOpen).then((data) => {
        console.log(data);
        const eventData = data.data;

        setIsPast(eventData.isEnded);
        if (eventData.thumbnail) {
          fetch(eventData.thumbnail)
            .then((response) => response.blob())
            .then((imageBlob) => {
              // Blob을 파일로 생성
              const imageFile = new File([imageBlob], "Thumbnail_Image.jpg", {
                type: "image/jepg",
              });
              setEventThumbnail(imageFile);
            })

            .catch((error) => {
              console.error("이미지를 가져오는 중 오류 발생: ", error);
            });
        }

        setEventTitle(eventData.title);
        const startDate = moment(eventData.startDate).format("YYYY-MM-DD");
        setEventStartDate(startDate);
        const endDate = moment(eventData.endDate).format("YYYY-MM-DD");
        setEventEndDate(moment(eventData.endDate).format("YYYY-MM-DD"));
        if (startDate !== endDate) {
          setIsAlldayChecked(false);
        }
        setIsAlldayChecked(eventData.isAllDay);
        setEventVenue(eventData.venue);
        setEventOpeningHoursHour(eventData.openingHour.split(":")[0]);
        setEventOpeningHoursMinute(eventData.openingHour.split(":")[1]);

        setRelatedWebsite(eventData.relatedWebsite);
        setEventPurpose(eventData.purpose);
        setEventExplanation(eventData.explanation);

        if (eventData.mainImages.length !== 0) {
          const imageArray = [];
          eventData.mainImages.map((data, idx) => {
            console.log(data);
            fetch(data)
              .then((response) => response.blob())
              .then((imageBlob) => {
                // Blob을 파일로 생성
                const imageFile = new File(
                  [imageBlob],
                  `EventMainImage${idx + 1}.jpg`,
                  {
                    type: "image/jepg",
                  }
                );
                imageArray.push({ id: idx, file: imageFile });
              })

              .catch((error) => {
                console.error("이미지를 가져오는 중 오류 발생: ", error);
              });
          });
          setEventDetailImg(imageArray);
        }

        if (eventData.galleries.length !== 0) {
          const imageArray = [];
          eventData.galleries.map((data, idx) => {
            console.log(data);
            fetch(data)
              .then((response) => response.blob())
              .then((imageBlob) => {
                // Blob을 파일로 생성
                const imageFile = new File(
                  [imageBlob],
                  `EventGalleryImage${idx + 1}.jpg`,
                  {
                    type: "image/jepg",
                  }
                );
                imageArray.push({ id: idx, file: imageFile });
              })

              .catch((error) => {
                console.error("이미지를 가져오는 중 오류 발생: ", error);
              });
          });
          setEventGalleryImg(imageArray);
        }

        setEventLatitude(eventData.latitude);
        setEventLongitude(eventData.longitude);
      });
    } else {
      setIsPast(false);
      setEventThumbnail();
      setEventTitle();
      setEventStartDate(today);
      setEventEndDate(today);
      setIsAlldayChecked(true);
      setEventVenue();
      setEventOpeningHoursHour();
      setEventOpeningHoursMinute();
      setRelatedWebsite();
      setEventPurpose();
      setEventExplanation();
      // 지도 초기 props값 세팅
      setEventLatitude(35.9552);
      setEventLongitude(128.566);
      setEventDetailImg([{ id: 1, file: null }]);
      setEventGalleryImg([{ id: 1, file: null }]);
    }
  };

  useEffect(() => {
    initEventdata();
  }, []);

  useEffect(() => {
    eventInputLayout();
  }, [isFormOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 이벤트를 무시하도록 기본 동작을 막음
    }
  };

  useEffect(() => {
    const imageUrl =
      "https://s3-orca-test.s3.ap-northeast-2.amazonaws.com/orcaFiles/events/1697675843996/43fac4af-87f6-4a53-bc66-8d50033124721.jpg";

    // 이미지를 가져와 Blob으로 변환
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Blob을 파일로 생성
        const imageFile = new File([imageBlob], "image.jpg", {
          type: "image/jpeg",
        });

        // 이제 imageFile을 사용하거나 다운로드할 수 있음
        console.log(imageFile);
      })
      .catch((error) => {
        console.error("이미지를 가져오는 중 오류 발생: ", error);
      });
  }, []);

  return (
    <div className="Layout">
      <div className="EventUpperBar">
        <div className="title semi24">이벤트 페이지</div>
        {!isFormOpen ? (
          <button className="ApplyButton" onClick={() => setIsFormOpen(-1)}>
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
        <form id="eventForm">
          <div className="EventInputLayout">
            <div className="EventInputLayoutUpperBar">
              <div className="EventSelectButtonSet">
                <button
                  type="button"
                  className={isPast.toString()}
                  onClick={() => setIsPast(true)}
                >
                  종료된 이벤트
                </button>
                <button
                  type="button"
                  className={(!isPast).toString()}
                  onClick={() => setIsPast(false)}
                >
                  예정 이벤트
                </button>
              </div>
              <div>
                <button
                  className="SaveButton"
                  onClick={(e) => {
                    onApplyEvent(e);
                  }}
                >
                  적용
                </button>
                {isFormOpen !== -1 && (
                  <button
                    className="DeleteButton"
                    onClick={(e) => deleteEvent(e)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
            <label className="EventImageInput">
              <div className="UploadImageSpace">
                <img src={images.upload} alt="Upload" />
              </div>
              <div htmlFor="imagePath">
                {eventThumbnail ? (
                  <div className="imagePath">{eventThumbnail.name}</div>
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
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
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
                        maxLength={2}
                        placeholder="Hour"
                        value={eventOpeningHoursHour}
                        onChange={(e) =>
                          setEventOpeningHoursHour(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                      />
                      <input
                        maxLength={2}
                        placeholder="Minute"
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
                location={eventLocation}
                setLocation={setEventLocation}
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
