import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/projects.css";
import images from "src/assets/images";

import AddForm from "./components/AddForm";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const status = ["Active", "Completed", "Terminated"];
  const [isStatusChecked, setIsStatusChecked] = useState([true, false, false]);
  const [isSexesChecked, setIsSexesChecked] = useState([true, false, false]);
  const [isVolunteersChecked, setIsVolunteersChecked] = useState([
    true,
    false,
    false,
  ]);
  const [investigatorFormArray, setInvestigatorFormArray] = useState([]);
  const [investigatorNumber, setInvestigatorNumber] = useState(1);

  const onInvestigatorButtonClick = (add) => {
    console.log("clicked");
    console.log(add);
    console.log(investigatorFormArray);
    // if (!add) {
    //   setInvestigatorFormArray([
    //     ...investigatorFormArray,
    //     <AddForm
    //       onButtonClick={onInvestigatorButtonClick}
    //       index={investigatorNumber}
    //     />
    //   ]);
    //   setInvestigatorNumber(investigatorNumber + 1);
    // } else if (add) {
    //   return;
    // }
  };

  const onStatusButtonClick = (index) => {
    let temp = [false, false, false, false];
    temp[index] = true;
    setIsStatusChecked(temp);
  };

  const onSexesButtonClick = (index) => {
    let temp = [false, false, false];
    temp[index] = true;
    setIsSexesChecked(temp);
  };

  const onVolunteersButtonClick = (index) => {
    let temp = [false, false, false];
    temp[index] = true;
    setIsVolunteersChecked(temp);
  };

  useEffect(() => {
    const init = (
      <AddForm onButtonClick={onInvestigatorButtonClick} index={0} />
    );
    console.log(init);
    setInvestigatorFormArray([init]);
  }, []);

  useEffect(() => {}, [investigatorFormArray]);

  return (
    <div className="Layout">
      <section className="ProjectSection">
        <div className="ProjectUpperBar">
          <img
            className="BackImage"
            src={images.backwithletter}
            onClick={() => navigate(-1)}
          />
          <div className="ProjectDetailPageTitle">
            프로젝트 상세 페이지 추가/편집
          </div>
          <button className="SaveButton">적용</button>
        </div>

        <div className="ProjectDetailButtonSet Status">
          {status.map((status, index) => (
            <button
              className={isStatusChecked[index].toString() + " status"}
              id={index}
              onClick={() => onStatusButtonClick(index)}
            >
              {status}
            </button>
          ))}
        </div>
        <article className="divideSector">
          <div className="ProjectDetailTitle">
            <div className="ArticleTitle">프로젝트 제목</div>
            <textarea className="ArticleInputArea" placeholder="Text" />
          </div>
          <div className="ProjectDetailPeriod">
            <div className="PeriodInputBox">
              <div className="title">Study Start (Actual)</div>
              <div className="periodInput">
                <input className="day" placeholder="DD" maxLength="2" />
                <input className="month" placeholder="MM" maxLength="2" />
                <input
                  className="year"
                  placeholder="YYYY"
                  maxLength="4"
                ></input>
              </div>
            </div>
            <div className="PeriodInputBox">
              <div className="title">Study Completion (Estimated)</div>
              <div className="periodInput">
                <input className="day" placeholder="DD" maxLength="2" />
                <input className="month" placeholder="MM" maxLength="2" />
                <input className="year" placeholder="YYYY" maxLength="4" />
              </div>
            </div>
            <div className="PeriodInputBox">
              <div className="title">Enrollment (Estimated)</div>
              <div className="periodInput">
                <input className="day" placeholder="DD" maxLength="2" />
                <input className="month" placeholder="MM" maxLength="2" />
                <input className="year" placeholder="YYYY" maxLength="4" />
              </div>
            </div>
            <div className="PeriodInputBox">
              <div className="title">Other Study ID Numbers</div>
              <input placeholder="Text" />
            </div>
            <div className="PeriodInputBox">
              <div className="title">Other Study ID Numbers</div>
              <input placeholder="Text" />
            </div>
          </div>
          <div className="StudyOverview">
            <div className="ArticleTitle">Study Overview</div>
            <textarea className="ArticleInputArea" placeholder="Text" />
          </div>
          <div className="OfficialTitle">
            <div className="ArticleTitle">Official Title</div>
            <textarea className="ArticleInputArea" placeholder="Text" />
          </div>
          <div className="ConditionsLink">
            <div className="subject">Conditions Link</div>
            <div className="LinkInput">
              <img src={images.link} />
              <input />
            </div>
          </div>
        </article>
        <article className="divideSector">
          <div className="ContactInformation">
            <div className="title">Contants and Locations</div>
            <div className="inputForm">
              <div className="subject">Name</div>
              <input className="smallInput name" placeholder="Text" />
              <div className="subject">Number</div>
              <input className="smallInput number" placeholder="00" />
              <div className="subject">Email</div>
              <input className="smallInput email" placeholder="Text" />
            </div>
            <div className="inputForm">
              <div className="subject">Location</div>
              <input className="smallInput locaion" placeholder="00" />
            </div>
          </div>
        </article>
      </section>
      <article className="divideSector">
        <div className="ParticipationCriteria">
          <div className="title">Participation Criteria</div>
          <div className="ArticleTitle">Inclusion Criteria</div>
          <textarea className="ArticleInputArea" placeholder="Text" />
          <div className="ArticleTitle">Exclusion Criteria</div>
          <textarea className="ArticleInputArea" placeholder="Text" />
        </div>
        <div className="CriteriaInputSector">
          <div style={{ display: "flex" }}>
            <div className="PeriodInputBox">
              <div className="title">Ages eligible for study</div>
              <input placeholder="ㅇ"></input>
            </div>
            <div className="PeriodInputBox">
              <div className="title">Sexes eligible for study</div>
              <div className="ProjectDetailButtonSet">
                <button
                  className={isSexesChecked[0] + " sexes"}
                  onClick={() => onSexesButtonClick(0)}
                >
                  Female
                </button>
                <button
                  className={isSexesChecked[1] + " sexes"}
                  onClick={() => onSexesButtonClick(1)}
                >
                  Male
                </button>
                <button
                  className={isSexesChecked[2] + " sexes"}
                  onClick={() => onSexesButtonClick(2)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="PeriodInputBox">
              <div className="title">Accepts healthy volunteers</div>
              <div className="ProjectDetailButtonSet">
                <button
                  className={isVolunteersChecked[0] + " volunteers"}
                  onClick={() => onVolunteersButtonClick(0)}
                >
                  Yes
                </button>
                <button
                  className={isVolunteersChecked[1] + " volunteers"}
                  onClick={() => onVolunteersButtonClick(1)}
                >
                  No
                </button>
                <button
                  className={isVolunteersChecked[2] + " volunteers"}
                  onClick={() => onVolunteersButtonClick(2)}
                >
                  -
                </button>
              </div>
            </div>
            <div className="PeriodInputBox">
              <div className="title">Sampling method</div>
              <input placeholder="Text" />
            </div>
          </div>
        </div>
      </article>
      <article className="divideSector">
        <div className="StudyPlan">
          <div className="title">Study Plan</div>
          <div className="StudyInputSet">
            <div className="subject">Observational Model</div>
            <input
              className="smallInput ObservationalModel"
              placeholder="Text"
            />
            <div className="subject">Time Perspective</div>
            <input className="smallInput TimePerspective" placeholder="Text" />
          </div>
          <div className="ArticleTitle">Intervention / Treatment</div>
          <textarea
            className="ArticleInputArea Intervention"
            placeholder="Text"
          />
          <div className="ArticleTitle">
            Outcome Measure / Measure Description / Time frame
          </div>
          <div className="MeasuresTable">
            <thead>
              <tr>
                <th></th>
                <th>Outcome Measure</th>
                <th>Measure Description</th>
                <th>Time frame</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Primary</th>
                <td>
                  <textarea placeholder="Text" />
                </td>
                <td>
                  <textarea placeholder="Text" />
                </td>
                <td>
                  <textarea placeholder="Text" />
                </td>
              </tr>
              <tr>
                <th>Secondary</th>
                <td>
                  <textarea placeholder="Text" />
                </td>
                <td>
                  <textarea placeholder="Text" />
                </td>
                <td>
                  <textarea placeholder="Text" />
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      </article>
      <article className="divideSector">
        <div className="CandI">
          <div className="title">Collaborators and Investigators</div>
          <div className="subtitle">Principal Investigator</div>
          {investigatorFormArray}
          <div className="subtitle">Collaborators</div>
          {investigatorFormArray}
        </div>
      </article>
      <article className="divideSector">
        <div className="Publiciations">
          <div className="title">Publications</div>
          <div style={{ display: "flex" }}>
            <div className="smallInput">
              <img src={images.link} />
              <input />
            </div>
            <img src={images.addform} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;
