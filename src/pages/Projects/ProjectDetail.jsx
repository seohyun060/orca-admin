import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./styles/projects.css";
import images from "src/assets/images";

import AddForm from "./components/AddForm";
import PublicationForm from "./components/PublicationForm";

import ProjectDummy from "./ProjectDummy";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const status = ["Active", "Completed", "Terminated"];
  const [isStatusChecked, setIsStatusChecked] = useState([false, false, false]);
  const [isSexesChecked, setIsSexesChecked] = useState([true, false, false]);
  const [isVolunteersChecked, setIsVolunteersChecked] = useState([
    true,
    false,
    false,
  ]);
  const [investigatorFormArray, setInvestigatorFormArray] = useState([
    ...ProjectDummy,
    {
      id: ProjectDummy[ProjectDummy.length - 1].id + 1,
      name: "",
      affiliation: "",
      link: "",
    },
  ]);
  const [collaboratorFormArray, setCollaboratorFormArray] = useState([
    ...ProjectDummy,
    {
      id: ProjectDummy[ProjectDummy.length - 1].id + 1,
      name: "",
      affiliation: "",
      link: "",
    },
  ]);
  const [publicationFormArray, setPublicationFormArray] = useState([
    ...ProjectDummy,
    { id: ProjectDummy[ProjectDummy.length - 1].id + 1, link: "" },
  ]);
  const [publicationNumber, setPublicationNumber] = useState(0);

  const [projectDetailData, setProjectDetailData] = useState(ProjectDummy);

  const [projectTitle, setProjectTitle] = useState(location.state.title);

  const onInvestigatorButtonClick = (id) => {
    const lastIndex =
      investigatorFormArray[investigatorFormArray.length - 1].id;
    if (id === lastIndex) {
      setInvestigatorFormArray([
        ...investigatorFormArray,
        { id: lastIndex + 1, name: "", affiliation: "", link: "" },
      ]);
    } else {
      setInvestigatorFormArray((prevInputs) =>
        prevInputs.filter((input) => input.id !== id)
      );
    }
  };

  const onCollaboratorButtonClick = (id) => {
    console.log(collaboratorFormArray);
    const lastIndex =
      collaboratorFormArray[collaboratorFormArray.length - 1].id;
    if (id === lastIndex) {
      setCollaboratorFormArray([
        ...collaboratorFormArray,
        { id: lastIndex + 1, name: "", affiliation: "", link: "" },
      ]);
    } else {
      setCollaboratorFormArray((prevInputs) =>
        prevInputs.filter((input) => input.id !== id)
      );
    }
  };

  const onPublicationButtonClick = (id) => {
    const lastIndex = publicationFormArray[publicationFormArray.length - 1].id;
    if (id === lastIndex) {
      setPublicationFormArray([
        ...publicationFormArray,
        { id: lastIndex + 1, name: "", affiliation: "", link: "" },
      ]);
    } else {
      setPublicationFormArray((prevInputs) =>
        prevInputs.filter((input) => input.id !== id)
      );
    }
  };

  const onStatusButtonClick = (index) => {
    let temp = [false, false, false];
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

  const initStatus = () => {
    const temp = [...status];
    const idx = temp.indexOf(location.state.status);
    temp[idx] = true;
    setIsStatusChecked(temp);
  };

  const investigator = {
    name: "",
    affiliation: "",
    link: "",
  };

  const formData = new FormData();

  const postProjectForm = async() => {
    // formData.append("projectId", "testpid");
    // formData.append("status", "ACTIVE");
    // formData.append("projectTitle", "ProjectTestDataTitle1");
    // formData.append("startDate", "2023-10-16");
    // formData.append("completeDate", "2023-10-17");
    // formData.append("enrollment", "2000");
    // formData.append("studyType", "CADAI_B");
    // formData.append("otherStudyId", null);
    // formData.append("overview", null);
    // formData.append("officialTitle", null);
    // formData.append("conditions", "Myocardial");
    // formData.append("name", null);
    // formData.append("phoneNumber", null);
    // formData.append("email", null);
    // formData.append("location", null);
    // formData.append("inclusionCriteria", null);
    // formData.append("exclusionCriteria", null);
    // formData.append("ageEligible", null);
    // formData.append("sexEligible", "ALL");
    // formData.append("acceptedHealthy", "YES");
    // formData.append("samplingMethod", null);
    // formData.append("observationalModel", null);
    // formData.append("timePerspective", null);
    // formData.append("interventionTreatment", null);
    // formData.append("primaryOutcome", null);
    // formData.append("secondaryOutcome", null);
    // formData.append("pi", null);
    // formData.append("collaborators", null);
    // formData.append("publications", null);


    fetch("/api/projects", {
      method: "GET",
      // body: formData,
    }).then((res) => res.json().then((data) => console.log("data", data)));
  };

  useEffect(() => {
    setPublicationNumber(ProjectDummy.length);
    initStatus();
  }, [investigatorFormArray]);

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
          <button className="SaveButton" onClick={postProjectForm}>
            적용
          </button>
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
            <textarea
              className="ArticleInputArea"
              placeholder="Text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
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
          <div className="Conditions">
            <div className="subject">Conditions</div>
            <input className="smallInput element" />
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
          {investigatorFormArray.map((data) => (
            <AddForm
              id={data.id}
              name={data.name}
              affiliation={data.affiliation}
              link={data.link}
              onButtonClick={onInvestigatorButtonClick}
              inputData={investigatorFormArray}
              changeInputData={setInvestigatorFormArray}
            ></AddForm>
          ))}
          <div className="subtitle">Collaborators</div>
          {collaboratorFormArray.map((data) => (
            <AddForm
              id={data.id}
              name={data.name}
              affiliation={data.affiliation}
              link={data.link}
              onButtonClick={onCollaboratorButtonClick}
              inputData={collaboratorFormArray}
              changeInputData={setCollaboratorFormArray}
            ></AddForm>
          ))}
        </div>
      </article>
      <article className="divideSector">
        <div className="Publiciations">
          <div className="title">Publications</div>
          {publicationFormArray.map((data) => (
            <PublicationForm
              id={data.id}
              link={data.link}
              onButtonClick={onPublicationButtonClick}
              inputData={publicationFormArray}
              changeInputData={setPublicationFormArray}
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;
