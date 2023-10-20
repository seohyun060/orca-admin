import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/projects.css";
import images from "src/assets/images";

import { getAllProjectData } from "src/api/projectsAPI";

const Project = (props) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const [displayedColor, setDisplayedColor] = useState(1);
  const [storedColor, setStoredColor] = useState(0.3);
  const [stored, setStored] = useState(false);
  const [edit, setEdit] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(projectList);

  const onDisplayedClick = () => {
    if (stored) {
      setStored(false);
      setDisplayedColor(1);
      setStoredColor(0.3);
    }
  };

  const onStoredClick = () => {
    if (!stored) {
      setStored(true);
      setDisplayedColor(0.3);
      setStoredColor(1);
    }
  };

  const onSetSearch = (e) => {
    setSearch(e.target.value);
  };

  const onStoredisplayClick = (projectList, id) => {
    const updatedList = [...projectList]; // Create a copy of the list
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].id == id) {
        updatedList[i].stored = !updatedList[i].stored;
        break;
      }
    }
    setProjectList(updatedList); // Up
  };

  const onEditClicked = (id) => {
    navigate("/project/default", {
      state: {
        id: id,
      },
    });
    window.scrollTo(0, 0);
  };

  const onTrashClick = (id) => {
    setProjectList((prevList) => {
      const updatedList = prevList.filter((insight) => insight.id !== id);
      return updatedList;
    });
  };

  useEffect(() => {
    const updatedProjects = [];
    for (let i = 0; i < 10; i++) {
      const project = {
        id: i + 1,
        title: "Project name",
        pid: "1234sd6879ds4fd",
        category: "CadAI-B/T",
        status: "Completed",
        stored: false,
      };
      updatedProjects.push(project);
    }
    setProjectList(updatedProjects);

    getAllProjectData().then((data) => {
      console.log(data.data);
      setProjectData(data.data);
    });
  }, []);

  useEffect(() => {
    setFilteredList(
      projectList.filter((project) => {
        if (project.title.includes(search)) {
          return true;
        }
      })
    );
  }, [search, projectList]);

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
          style={{ opacity: storedColor }}
          onClick={() => {
            onStoredClick();
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
          disabled={stored ? true : false}
          className={stored ? "add" : "add-active"}
          style={{
            color: stored ? "#9E9E9E" : "#fff",
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
          project.stored == stored ? (
            <div className="list">
              <div className="title">
                <span>{project.title}</span>
              </div>
              <div className="pid">
                <span>{project.pid}</span>
              </div>
              <div className="category">
                <span>{project.category}</span>
              </div>
              <div className="status">
                <span>{project.status}</span>
                <button
                  className="store"
                  onClick={() => {
                    onStoredisplayClick(projectList, project.id);
                  }}
                >
                  {stored ? "게시" : "보관"}
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
