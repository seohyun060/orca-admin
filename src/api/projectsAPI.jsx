import client from "./client.js";

export async function getAllProjectData() {
  return fetch(`http://43.202.46.227/api/projects`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function getOneProjectData(id) {
  return fetch(`http://43.202.46.227/api/projects/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function postNewProjectData(data) {
  const jsonData = JSON.stringify(data);

  return fetch(`http://43.202.46.227/api/projects`, {
    method: "POST",
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function putChangeStoredProjectData(id, isStored) {
  const jsonData = JSON.stringify([]);

  return fetch(`http://43.202.46.227/api/projects/${id}?store=${isStored}`, {
    method: "PUT",
    // body: jsonData,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function putOneProjectData(id, data) {
  const jsonData = JSON.stringify(data);

  return fetch(`http://43.202.46.227/api/projects/${id}`, {
    method: "PUT",
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function deleteOneProjectData(id) {
  return fetch(`http://43.202.46.227/api/projects/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export const testAPI = async () => {
  let data = new FormData();
  let formDate = new FormData();

  // formData.append("projectId", "2.13454835226356");
  // formData.append("status", "ACTIVE");
  // formData.append(
  //   "projectTitle",
  //   "Real-time Decision Support by Light-weighted AI Model Trained with Large-scale Data for Breast Cancer 30"
  // );
  // formData.append("startDate", "2023-05-22");
  // formData.append("completeDate", "2025-05-22");
  // formData.append("enrollment", 2000);
  // formData.append("studyType", "CHAT_AI");
  // formData.append("otherStudyId", null);
  // formData.append(
  //   "overview",
  //   "Lorem ipsum dolor sit amet, cosectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation Lorem ipsum dolor sit amet, cosectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation"
  // );
  // formData.append("officialTitle", null);
  // formData.append("conditions", "Myocardial");
  // formData.append("name", null);
  // formData.append("phoneNumber", null);
  // formData.append("email", null);
  // formData.append("location", "Bukgu, Daegu, Korea");
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

  const testJson = {
    projectId: "2.1",
    status: "ACTIVE",
    projectTitle:
      "Real-time Decision Support by Light-weighted AI Model Trained with Large-scale Data for Breast Cancer 30",
    startDate: "2023-05-22",
    completeDate: "2025-05-22",
    enrollment: 2000,
    studyType: "CHAT_AI",
    otherStudyId: null,
    overview: "Lorem ipsum dolor sit amet, cosectetuer adipiscing elit, ",
    officialTitle: null,
    conditions: "Myocardial",
    name: null,
    phoneNumber: null,
    email: null,
    location: "Bukgu, Daegu, Korea",
    inclusionCriteria: null,
    exclusionCriteria: null,
    ageEligible: null,
    sexEligible: "ALL",
    acceptedHealthy: "NO",
    samplingMethod: null,
    observationalModel: null,
    timePerspective: null,
    interventionTreatment: null,
    primaryOutcome: null,
    secondaryOutcome: null,
    pi: null,
    collaborators: null,
    publications: null,
  };

  data.append("isEnded", "True");
  // data.append("thumbnail", undefined);
  data.append("title", "Test Event 2");
  data.append("startDate", "2023-10-12");
  data.append("endDate", "2023-10-17");
  data.append("isAllDay", "True");
  data.append("venue", "BeamWorks");
  data.append("openingHour", "");
  data.append("relatedWebsite", "");
  data.append("purpose", "");
  data.append("explanation", "");
  // data.append("mainImages", undefined);
  data.append("location", "");
  data.append("latitude", "65.454544");
  data.append("longitude", "77.878974");
  // data.append("galleries", undefined);

  // const testJson = {
  //   isEnded: "True",
  //   thumbnail: undefined,
  //   title: "Test Event 2",
  //   startDate: "2023-10-12",
  //   endDate: "2023-10-17",
  //   isAllDay: "True",
  //   venue: "",
  //   openingHour: "",
  //   relatedWebsite: "",
  //   purpose: "",
  //   explanation: "",
  //   mainImages: undefined,
  //   location: "",
  //   latitude: "65.454544",
  //   longitude: "77.878974",
  //   galleries: undefined,
  // };

  console.log(data);

  JSON.stringify(testJson);

  console.log(testJson);

  fetch("http://43.202.46.227/api/projects", {
    method: "POST",
    body: testJson,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json().then((data) => console.log("data", data)));

  fetch("http://43.202.46.227/api/events", {
    method: "GET",
  }).then((res) => res.json().then((data) => console.log("data", data)));
};

// 프로젝트는 json 직렬화 + header
// 이벤트는 header 없이 (form-data 추가 X)
