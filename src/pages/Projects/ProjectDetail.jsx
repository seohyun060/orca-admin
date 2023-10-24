import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

import "./styles/projects.css";
import images from "src/assets/images";

import AddForm from "./components/AddForm";
import PublicationForm from "./components/PublicationForm";
import SetEventDateCalendar from "../Events/components/SetEventDateCalendar";

import ProjectDummy from "./ProjectDummy";

import {
  testAPI,
  getOneProjectData,
  postNewProjectData,
  deleteOneProjectData,
} from "src/api/projectsAPI";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  const [projectData, setProjectData] = useState([]);

  const status = ["Active", "Completed", "Terminated"];
  const statusInPost = ["ACTIVE", "COMPLETED", "TERMINATED"];
  const [isStatusChecked, setIsStatusChecked] = useState([false, false, false]);
  const [projectTitle, setProjectTitle] = useState();

  const [isStartDateClick, setIsStartDateClick] = useState(false);
  const [isCompleteDateClick, setIsCompleteDateClick] = useState(false);

  const [projectStartDate, setProjectStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [projectCompleteDate, setProjectCompleteDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [projectEnrollment, setProjectEnrollment] = useState();
  const [projectStudyType, setProjectStudyType] = useState();
  const [projectOtherStudyId, setProjectOtherStudyId] = useState();

  const [projectOverview, setProjectOverview] = useState();
  const [projectOfficialTitle, setProjectOfficialTitle] = useState();
  const [projectConditions, setProjectConditions] = useState();

  const [projectName, setProjectName] = useState();
  const [projectPhoneNumber, setProjectPhoneNumber] = useState();
  const [projectEmail, setProjectEmail] = useState();
  const [projectLocation, setProjectLocation] = useState();

  const [projectInclusionCriteria, setProjectInclusionCriteria] = useState();
  const [projectExclusionCriteria, setProjectExclusionCriteria] = useState();

  const [projectAgeEligible, setProjectAgeEligible] = useState();
  const sexes = ["Female", "Male", "-"];
  const sexesInPost = ["FEMALE", "MALE", "ALL"];
  const [isSexesChecked, setIsSexesChecked] = useState([true, false, false]);
  const [projectSexEligible, setProjectSexEligible] = useState("Female");
  const Volunteers = ["Yes", "No", "-"];
  const VolunteersInPost = ["YES", "NO", "NOT_SPECIFIED"];
  const [isVolunteersChecked, setIsVolunteersChecked] = useState([
    true,
    false,
    false,
  ]);
  const [projectAcceptedHealthy, setProjectAcceptedHealthy] = useState();
  const [projectSamplingMethod, setProjectSamplingMethod] = useState();

  const [projectObservationalModelMethod, setProjectObservationalModelMethod] =
    useState();
  const [projectTimePerspectiveMethod, setProjectTimePerspectiveMethod] =
    useState();
  const [projectInterventionTreatment, setProjectInterventionTreatment] =
    useState();

  const [projectPrimaryOutcome, setProjectPrimaryOutcome] = useState([]);
  const [projectSecondaryOutcome, setProjectSecondaryOutcome] = useState([]);

  const [projectPi, setProjectPi] = useState();
  const [projectCollaborators, setProjectCollaborators] = useState();
  const [projectPublications, setProjectPublications] = useState();

  const onPiButtonClick = (id) => {
    console.log(projectPi);
    const lastIndex = projectPi[projectPi.length - 1].id;
    if (id === lastIndex) {
      setProjectPi([
        ...projectPi,
        { id: lastIndex + 1, name: "", affiliation: "", link: "" },
      ]);
    } else {
      setProjectPi((prevInputs) =>
        prevInputs.filter((input) => input.id !== id)
      );
    }
  };

  const onCollaboratorsButtonClick = (id) => {
    console.log(projectCollaborators);
    console.log(projectCollaborators);
    const lastIndex = projectCollaborators[projectCollaborators.length - 1].id;
    if (id === lastIndex) {
      setProjectCollaborators([
        ...projectCollaborators,
        { id: lastIndex + 1, name: "", affiliation: "", link: "" },
      ]);
    } else {
      setProjectCollaborators((prevInputs) =>
        prevInputs.filter((input) => input.id !== id)
      );
    }
  };

  const onPublicationsButtonClick = (id) => {
    const lastIndex = projectPublications[projectPublications.length - 1].id;
    if (id === lastIndex) {
      setProjectPublications([
        ...projectPublications,
        { id: lastIndex + 1, link: "" },
      ]);
    } else {
      setProjectPublications((prevInputs) =>
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
    setProjectSexEligible(sexes[index]);
  };

  const onVolunteersButtonClick = (index) => {
    let temp = [false, false, false];
    temp[index] = true;
    setIsVolunteersChecked(temp);
    setProjectAcceptedHealthy(Volunteers[index]);
  };

  const initStatus = () => {
    if (id === 0) {
      setIsStatusChecked([true, false, false]);
    } else {
      const temp = [...status];
      const idx = temp.indexOf(location.state.status);
      temp[idx] = true;
      setIsStatusChecked(temp);
    }
  };

  const initPi = () => {
    let piArray = [];
    if (projectPi == null) {
      piArray = [
        {
          id: 0,
          name: "",
          affiliation: "",
          link: "",
        },
      ];
    } else {
      projectPi.map((data, idx) => {
        const pi = { id: idx, ...data };
        piArray.push(pi);
      });
      piArray = [
        ...piArray,
        {
          id: piArray[piArray.length - 1].id + 1,
          name: "",
          affiliation: "",
          link: "",
        },
      ];
    }
    console.log("piArray", piArray);
    setProjectPi(piArray);
  };

  const initCollaborators = () => {
    let collaboratorsArray = [];
    if (projectCollaborators == null) {
      collaboratorsArray = [
        {
          id: 0,
          name: "",
          affiliation: "",
          link: "",
        },
      ];
    } else {
      projectCollaborators.map((data, idx) => {
        const pi = { id: idx, ...data };
        collaboratorsArray.push(pi);
      });
      collaboratorsArray = [
        ...collaboratorsArray,
        {
          id: collaboratorsArray[collaboratorsArray.length - 1].id + 1,
          name: "",
          affiliation: "",
          link: "",
        },
      ];
    }
    setProjectCollaborators(collaboratorsArray);
  };

  const initPublications = () => {
    let publicationsArray = [];
    if (projectPublications == null) {
      publicationsArray = [
        {
          id: 0,
          link: "",
        },
      ];
    } else {
      projectPublications.map((data, idx) => {
        const pi = { id: idx, ...data };
        publicationsArray.push(pi);
      });
      publicationsArray = [
        ...publicationsArray,
        {
          id: publicationsArray[publicationsArray.length - 1].id + 1,
          link: "",
        },
      ];
    }
    setProjectPublications(publicationsArray);
  };

  const initProject = () => {
    if (id !== 0) {
      getOneProjectData(id).then((data) => {
        console.log(data);

        const project = data.data;
        setProjectData(project);
        onStatusButtonClick(statusInPost.indexOf(project.status));
        setProjectTitle(project.projectTitle);
        setProjectStartDate(project.startDate);
        setProjectCompleteDate(project.completeDate);
        setProjectEnrollment(project.enrollment);
        setProjectStudyType(project.studyType)
        setProjectOtherStudyId(project.otherStudyId)
        setProjectOverview(project.overview);
        setProjectOfficialTitle(project.officialTitle);
        setProjectConditions(project.conditions);
        setProjectName(project.name);
        setProjectPhoneNumber(project.phoneNumber);
        setProjectEmail(project.email);
        setProjectLocation(project.location);
        setProjectInclusionCriteria(project.inclusionCriteria);
        setProjectExclusionCriteria(project.exclusionCriteria);
        setProjectAgeEligible(project.ageEligible);
        setProjectSexEligible(project.sexEligible);
        setProjectAcceptedHealthy(project.acceptedHealthy);
        setProjectSamplingMethod(project.samplingMethod);
        setProjectObservationalModelMethod(project.observationalModel);
        setProjectTimePerspectiveMethod(project.timePerspective);
        setProjectInterventionTreatment(project.interventionTreatment);
        setProjectPrimaryOutcome(project.primaryOutcome);
        setProjectSecondaryOutcome(project.secondaryOutcome);
        initPi();
        initCollaborators();
        initPublications();

        return;
      });
    }

    // 새 데이터 입력시
    initPi();
    initCollaborators();
    initPublications();
  };

  const test = (e) => {
    const formData = new FormData(document.getElementById("projectForm"));
    formData.append("projectID", "1.23456");
    formData.append("status", statusInPost[isStatusChecked.indexOf(true)]);

    formData.append("sexEligible", sexesInPost[isSexesChecked.indexOf(true)]);
    formData.append(
      "acceptedHealthy",
      VolunteersInPost[isVolunteersChecked.indexOf(true)]
    );

    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ", " + pair[1]);
    }

    e.preventDefault();
    postNewProjectData(formData).then((data) => {
      console.log(data);
    });

    // deleteOneProjectData(11).then((data) => {
    //   console.log(data);
    // });

    // testAPI().then((data) => {
    //   console.log(data);
    // });
  };

  useEffect(() => {
    initStatus();
    initProject();
  }, []);

  return (
    <div className="Layout">
      <form name="projectForm" id="projectForm">
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
            <button className="SaveButton" onClick={(e) => test(e)}>
              적용
            </button>
          </div>

          <div className="ProjectDetailButtonSet Status">
            {status.map((status, index) => (
              <button
                type="button"
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
                name="projectTitle"
                placeholder="Text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <div className="ProjectDetailPeriod">
              <div className="PeriodInputBox">
                <div className="title">Study Start (Actual)</div>
                <div className="ProjectStartDate">
                  <div
                    className="clickLayout"
                    onClick={() => setIsStartDateClick(!isStartDateClick)}
                  >
                    <img src={images.smallcalendar} />
                    <input name="startDate" value={projectStartDate} />
                  </div>
                </div>
                {isStartDateClick ? (
                  <SetEventDateCalendar
                    setIsClose={setIsStartDateClick}
                    eventDate={projectStartDate}
                    setEventDate={setProjectStartDate}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className="PeriodInputBox">
                <div className="title">Study Completion (Estimated)</div>
                <div className="ProjectCompleteDate">
                  <div
                    className="clickLayout"
                    onClick={() => setIsCompleteDateClick(!isCompleteDateClick)}
                  >
                    <img src={images.smallcalendar} />
                    <input name="completeDate" value={projectCompleteDate} />
                  </div>
                </div>
                {isCompleteDateClick ? (
                  <SetEventDateCalendar
                    setIsClose={setIsCompleteDateClick}
                    eventDate={projectCompleteDate}
                    setEventDate={setProjectCompleteDate}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="PeriodInputBox">
                <div className="title">Enrollment (Estimated)</div>
                <input
                  placeholder="Text"
                  name="enrollment"
                  value={projectEnrollment}
                  onChange={(e) => setProjectEnrollment(e.target.value)}
                />
              </div>
              <div className="PeriodInputBox">
                <div className="title">Study Type</div>
                <input
                  placeholder="Text"
                  name="studyType"
                  value={projectStudyType}
                  onChange={(e) => setProjectStudyType(e.target.value)}
                />
              </div>
              <div className="PeriodInputBox">
                <div className="title">Other Study ID Numbers</div>
                <input
                  placeholder="Text"
                  name="otherStudyId"
                  value={projectOtherStudyId}
                  onChange={(e) => setProjectOtherStudyId(e.target.value)}
                />
              </div>
            </div>
            <div className="StudyOverview">
              <div className="ArticleTitle">Study Overview</div>
              <textarea
                className="ArticleInputArea"
                placeholder="Text"
                name="overview"
                value={projectOverview}
                onChange={(e) => setProjectOverview(e.target.value)}
              />
            </div>
            <div className="OfficialTitle">
              <div className="ArticleTitle">Official Title</div>
              <textarea
                className="ArticleInputArea"
                placeholder="Text"
                name="officialTitle"
                value={projectOfficialTitle}
                onChange={(e) => setProjectOfficialTitle(e.target.value)}
              />
            </div>
            <div className="Conditions">
              <div className="subject">Conditions</div>
              <input
                className="smallInput element"
                name="conditions"
                value={projectConditions}
                onChange={(e) => setProjectConditions(e.target.value)}
              />
            </div>
          </article>
          <article className="divideSector">
            <div className="ContactInformation">
              <div className="title">Contants and Locations</div>
              <div className="inputForm">
                <div className="subject">Name</div>
                <input
                  className="smallInput name"
                  placeholder="Text"
                  name="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <div className="subject">Number</div>
                <input
                  className="smallInput number"
                  placeholder="00"
                  name="phoneNumber"
                  value={projectPhoneNumber}
                  onChange={(e) => setProjectPhoneNumber(e.target.value)}
                />
                <div className="subject">Email</div>
                <input
                  className="smallInput email"
                  placeholder="Text"
                  name="email"
                  value={projectEmail}
                  onChange={(e) => setProjectEmail(e.target.value)}
                />
              </div>
              <div className="inputForm">
                <div className="subject">Location</div>
                <input
                  className="smallInput locaion"
                  placeholder="00"
                  name="location"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                />
              </div>
            </div>
          </article>
        </section>
        <article className="divideSector">
          <div className="ParticipationCriteria">
            <div className="title">Participation Criteria</div>
            <div className="ArticleTitle">Inclusion Criteria</div>
            <textarea
              className="ArticleInputArea"
              placeholder="Text"
              name="inclusionCriteria"
              value={projectInclusionCriteria}
              onChange={(e) => setProjectInclusionCriteria(e.target.value)}
            />
            <div className="ArticleTitle">Exclusion Criteria</div>
            <textarea
              className="ArticleInputArea"
              placeholder="Text"
              name="exclusionCriteria"
              value={projectExclusionCriteria}
              onChange={(e) => setProjectExclusionCriteria(e.target.value)}
            />
          </div>
          <div className="CriteriaInputSector">
            <div style={{ display: "flex" }}>
              <div className="PeriodInputBox">
                <div className="title">Ages eligible for study</div>
                <input
                  placeholder="ㅇ"
                  name="ageEligible"
                  value={projectAgeEligible}
                  onChange={(e) => setProjectAgeEligible(e.target.value)}
                ></input>
              </div>
              <div className="PeriodInputBox">
                <div className="title">Sexes eligible for study</div>
                <div className="ProjectDetailButtonSet">
                  {isSexesChecked.map((data, idx) => (
                    <button
                      type="button"
                      className={isSexesChecked[idx] + " sexes"}
                      onClick={() => onSexesButtonClick(idx)}
                    >
                      {sexes[idx]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="PeriodInputBox">
                <div className="title">Accepts healthy volunteers</div>
                <div className="ProjectDetailButtonSet">
                  {isSexesChecked.map((data, idx) => (
                    <button
                      type="button"
                      className={isVolunteersChecked[idx] + " volunteers"}
                      onClick={() => onVolunteersButtonClick(idx)}
                    >
                      {Volunteers[idx]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="PeriodInputBox">
                <div className="title">Sampling method</div>
                <input
                  placeholder="Text"
                  name="samplingMethod"
                  value={projectSamplingMethod}
                  onChange={(e) => setProjectSamplingMethod(e.target.value)}
                />
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
                name="observationalModel"
                value={projectObservationalModelMethod}
                onChange={(e) =>
                  setProjectObservationalModelMethod(e.target.value)
                }
              />
              <div className="subject">Time Perspective</div>
              <input
                className="smallInput TimePerspective"
                placeholder="Text"
                name="timePerspective"
                value={projectTimePerspectiveMethod}
                onChange={(e) =>
                  setProjectTimePerspectiveMethod(e.target.value)
                }
              />
            </div>
            <div className="ArticleTitle">Intervention / Treatment</div>
            <textarea
              className="ArticleInputArea Intervention"
              placeholder="Text"
              name="interventionTreatment"
              value={projectInterventionTreatment}
              onChange={(e) => setProjectInterventionTreatment(e.target.value)}
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
                    <textarea
                      placeholder="Text"
                      name="projectPrimaryOutcomeMeasure"
                      value={projectPrimaryOutcome[0]}
                      onChange={(e) =>
                        setProjectPrimaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[0] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      placeholder="Text"
                      name="projectPrimaryMeasureDescription"
                      value={projectPrimaryOutcome[1]}
                      onChange={(e) =>
                        setProjectPrimaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[1] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      placeholder="Text"
                      name="projectPrimaryMeasureTimeFrame"
                      value={projectPrimaryOutcome[2]}
                      onChange={(e) =>
                        setProjectPrimaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[2] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>Secondary</th>
                  <td>
                    <textarea
                      placeholder="Text"
                      name="projectSecondaryOutcomeMeasure"
                      value={projectSecondaryOutcome[0]}
                      onChange={(e) =>
                        setProjectSecondaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[0] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      placeholder="Text"
                      name="projectSecondaryMeasureDescription"
                      value={projectSecondaryOutcome[1]}
                      onChange={(e) =>
                        setProjectSecondaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[1] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      placeholder="Text"
                      name="projectSecondaryMeasureTimeFrame"
                      value={projectSecondaryOutcome[2]}
                      onChange={(e) =>
                        setProjectSecondaryOutcome((prev) => {
                          let origin = [...prev];
                          origin[2] = e.target.value;
                          return origin;
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        </article>
        <article className="divideSector">
          <div className="CandI">
            <div className="title">Collaborators and Investigators</div>
            <div className="CandIFormSet">
              <div className="subtitle">Principal Investigator</div>
              {projectPi &&
                projectPi.map((data) => (
                  <AddForm
                    id={data.id}
                    name={data.name}
                    affiliation={data.affiliation}
                    link={data.link}
                    onButtonClick={onPiButtonClick}
                    inputData={projectPi}
                    changeInputData={setProjectPi}
                  ></AddForm>
                ))}
            </div>
            <div className="CandIFormSet">
              <div className="subtitle">Collaborators</div>
              {projectCollaborators &&
                projectCollaborators.map((data) => (
                  <AddForm
                    id={data.id}
                    name={data.name}
                    affiliation={data.affiliation}
                    link={data.link}
                    onButtonClick={onCollaboratorsButtonClick}
                    inputData={projectCollaborators}
                    changeInputData={setProjectCollaborators}
                  ></AddForm>
                ))}
            </div>
          </div>
        </article>
        <article className="divideSector">
          <div className="Publiciations">
            <div className="title">Publications</div>
            {projectPublications &&
              projectPublications.map((data) => (
                <PublicationForm
                  id={data.id}
                  link={data.link}
                  onButtonClick={onPublicationsButtonClick}
                  inputData={projectPublications}
                  changeInputData={setProjectPublications}
                />
              ))}
          </div>
        </article>
      </form>
    </div>
  );
};

export default ProjectDetail;
