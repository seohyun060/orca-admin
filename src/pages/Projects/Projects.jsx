import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/projects.css";
import images from "src/assets/images";
import { getCookie } from "src/cookies/cookie";

import {
  getAllProjectData,
  putChangeStoredProjectData,
  deleteOneProjectData,
} from "src/api/projectsAPI";

const Project = (props) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const [displayedColor, setDisplayedColor] = useState(1);
  const [isStoredColor, setIsStoredColor] = useState(0.3);
  const [isStored, setIsStored] = useState(false);
  const [edit, setEdit] = useState(0);
  const [search, setSearch] = useState("");

  const onDisplayedClick = () => {
    if (isStored) {
      setIsStored(false);
      setDisplayedColor(1);
      setIsStoredColor(0.3);
    }
  };

  const onisStoredClick = () => {
    if (!isStored) {
      setIsStored(true);
      setDisplayedColor(0.3);
      setIsStoredColor(1);
    }
  };

  const onSetSearch = (e) => {
    setSearch(e.target.value);
  };

  const onisStoredisplayClick = async (id) => {
    // 로직 수정필요
    const targetIndex = projectList.findIndex((data) => data.id == id);

    const isStored = !projectList[targetIndex].isStored;
    await putChangeStoredProjectData(id, isStored).then((data) => {});
    let temp = [...projectList];

    temp[targetIndex].isStored = !temp[targetIndex].isStored;
    setProjectList(temp);
  };

  const onEditClicked = (id) => {
    console.log(id);
    navigate(`/project/${id}`);
    window.scrollTo(0, 0);
  };

  const onTrashClick = async (id) => {
    await deleteOneProjectData(id).then((data) => {});
    setProjectList(projectList.filter((data) => data.id != id));
  };

  const initData = async () => {
    await getAllProjectData().then((data) => {
      setProjectData(data.data);

      const updatedProjects = [];

      data.data.map((data, i) => {
        updatedProjects.push(data);
      });
      setProjectList(updatedProjects);
    });
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    let check = getCookie("login");
    console.log(typeof check, "sfsdfsffasgagf");
    if (typeof check == "undefined") {
      //alert('로그인이 필요한 화면입니다');
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const filteredList = projectData.filter((project) => {
      if (project.projectTitle.includes(search)) {
        return true;
      }
    });
    setProjectList(filteredList);
  }, [search]);

  return (
    <div className="Project">
      <div className="Project-head">
        <div
          className="title"
          style={{ opacity: displayedColor }}
          onClick={() => {
            onDisplayedClick();
          }}
        >
          프로젝트 리스트
        </div>
        <div
          className="title"
          style={{ opacity: isStoredColor }}
          onClick={() => {
            onisStoredClick();
          }}
        >
          프로젝트 보관 리스트
        </div>

        <div className="search">
          <input
            placeholder="search"
            onChange={onSetSearch}
            required
            value={search}
          ></input>
          {search ? <img src={images.search_b} /> : <img src={images.search} />}
        </div>
        <button
          disabled={isStored ? true : false}
          className={isStored ? "add" : "add-active"}
          style={{
            color: isStored ? "#9E9E9E" : "#fff",
          }}
          onClick={() => {
            onEditClicked(0);
          }}
        >
          프로젝트 추가
        </button>
      </div>
      <div className="Project-body">
        <div className="label">
          <div className="title">
            <span>제목</span>
          </div>
          <div className="pid">
            <span>프로젝트 ID</span>
          </div>
          <div className="category">
            <span>제품명</span>
          </div>
          <div className="status">
            <span>상태</span>
          </div>
        </div>
        {projectList.map((project, index) =>
          project.isStored == isStored ? (
            <div className="list">
              <div className="title">
                <span>{project.projectTitle}</span>
              </div>
              <div className="pid">
                <span>{project.projectId}</span>
              </div>
              <div className="category">
                <span>{project.studyType}</span>
              </div>
              <div className="status">
                <span>{project.status}</span>
                <button
                  className="store"
                  onClick={() => {
                    onisStoredisplayClick(project.id);
                  }}
                >
                  {isStored ? "게시" : "보관"}
                </button>
                <button
                  className="edit"
                  onClick={() => {
                    onEditClicked(project.id);
                  }}
                >
                  편집
                </button>
              </div>
              <img
                src={images.trash}
                onClick={() => {
                  onTrashClick(project.id);
                }}
              />
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Project;
