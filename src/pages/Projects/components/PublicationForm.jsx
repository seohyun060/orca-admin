import React, { useEffect, useState } from "react";

import images from "src/assets/images";

const PublicationForm = (props) => {
  const {
    id,
    title,
    author,
    pubYear,
    journal,
    conference,
    volume,
    link,
    onButtonClick,
    inputData,
    changeInputData,
  } = props;
  const [inputTitle, setInputTitle] = useState(title);
  const [inputAuthor, setInputAuthor] = useState(author);
  const [inputPubYear, setInputPubYear] = useState(pubYear);
  const [inputJournal, setInputJournal] = useState(journal);
  const [inputConference, setInputConference] = useState(conference);
  const [inputVolume, setInputVolume] = useState(volume);
  const [inputLink, setInputLink] = useState(link);

  const syncParentData = () => {
    let modifyData = [...inputData];
    modifyData.map((data) => {
      if (data.id === id) {
        data.title = inputTitle;
        data.author = inputAuthor;
        data.pubYear = inputPubYear;
        data.journal = inputJournal;
        data.conference = inputConference;
        data.volume = inputVolume;
        data.link = inputLink;
      }
    });
    changeInputData(modifyData);
  };

  useEffect(() => {
    setInputTitle(title);
    setInputAuthor(author);
    setInputPubYear(pubYear);
    setInputJournal(journal);
    setInputConference(conference);
    setInputVolume(volume);
    setInputLink(link);
  }, [title, author, pubYear, journal, conference, volume, link]);

  useEffect(() => {
    syncParentData();
  }, [
    inputTitle,
    inputAuthor,
    inputPubYear,
    inputJournal,
    inputConference,
    inputVolume,
    inputLink,
  ]);

  return (
    <>
      <div className="PublicationLink">
        <div className="smallInput">
          <img src={images.link} />
          <input
            value={inputLink}
            maxLength={1000}
            onChange={(e) => {
              setInputLink(e.target.value);
            }}
          />
        </div>
        <img
          src={
            id !== inputData[inputData.length - 1].id
              ? images.removeform
              : images.add
          }
          onClick={() => onButtonClick(id)}
        />
      </div>
      <div className="info">
        <div className="info-title">
          <div className="header">논문제목</div>
          <div className="stroke"></div>
          <input
            className="body"
            maxLength={1000}
            onChange={(e) => setInputTitle(e.target.value)}
            value={inputTitle}
          />
        </div>
        <div className="info-author">
          <div className="header">저자명</div>
          <div className="stroke"></div>
          <input
            className="body"
            maxLength={1000}
            onChange={(e) => setInputAuthor(e.target.value)}
            value={inputAuthor}
          />
        </div>
        <div className="info-yjc">
          <div className="y">
            <div className="header">출판연도</div>
            <div className="stroke"></div>
            <input
              className="body"
              maxLength={4}
              onChange={(e) => {
                const inputValue = e.target.value;
                // 숫자 형태의 문자열만 허용하는 정규식
                const numericRegex = /^\d*$/;

                if (numericRegex.test(inputValue)) {
                  // 입력값이 숫자 형태의 문자열이라면 onChange 호출
                  setInputPubYear(e.target.value);
                }
              }}
              value={inputPubYear}
            />
          </div>
          <div className="j">
            <div className="header">저널</div>
            <div className="stroke"></div>
            <input
              className="body"
              maxLength={1000}
              onChange={(e) => setInputJournal(e.target.value)}
              value={inputJournal}
            />
          </div>
          <div className="c">
            <div className="header">컨퍼런스 명</div>
            <div className="stroke"></div>
            <input
              className="body"
              maxLength={1000}
              onChange={(e) => setInputConference(e.target.value)}
              value={inputConference}
            />
          </div>
        </div>
        <div className="info-ho">
          <div className="header">권 (호)</div>
          <div className="stroke"></div>
          <input
            className="body"
            onChange={(e) => setInputVolume(e.target.value)}
            value={inputVolume}
          />
        </div>
      </div>
    </>
  );
};

export default PublicationForm;
