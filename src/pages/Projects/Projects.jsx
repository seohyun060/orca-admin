import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/projects.css";
import images from "src/assets/images";

const Project = (props) => {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [displayedColor, setDisplayedColor] = useState(1);
  const [storedColor, setStoredColor] = useState(0.3);
  const [stored, setStored] = useState(false);
  const [edit, setEdit] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(projectList);

  const onDisplayedClick = useCallback(() => {
    if (stored) {
      setStored(false);
      setDisplayedColor(1);
      setStoredColor(0.3);
    }
    console.log(stored, displayedColor, storedColor);
  }, [stored, displayedColor, storedColor]);

  const onStoredClick = () => {
    if (!stored) {
      setStored(true);
      setDisplayedColor(0.3);
      setStoredColor(1);
    }
    console.log(stored, displayedColor, storedColor);
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

  const onTrashClick = (id) => {
    setProjectList((prevList) => {
      const updatedList = prevList.filter((insight) => insight.id !== id);
      return updatedList;
    });
  };

  const onEditClicked = (edit, id, type, pdfList, text) => {
    navigate("/insightinfo", {
      state: {
        Edit: edit,
        Id: id,
        Type: type,
        PdfList: pdfList,
        Text: text,
      },
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const updatedProjects = [];
    for (let i = 0; i < 20; i++) {
      const project = {
        id: i + 1,
        name: "Project name",
        pid: "1234sd6879ds4fd",
        category: "CadAI-B/T",
        status: "Active",
      };
      updatedProjects.push(project);
    }
    setProjectList(updatedProjects);
  }, []);

  // useEffect(() => {
  //   setFilteredList(
  //     projectList.filter((project) => project.id.indexOf(search) !== -1)
  //   );
  //   return () => {};
  // }, [search, projectList]);

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
          <img src={images.search} />
        </div>
        <button
          disabled={stored ? true : false}
          style={{
            backgroundColor: stored ? "#E1E1E1" : "#0D5699",
            color: stored ? "#9E9E9E" : "#fff",
          }}
          onClick={() => {
            onEditClicked(false, projectList.length + 1, "White paper", [], "");
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
                    onEditClicked(
                      true,
                      project.id,
                      project.type,
                      project.pdfList,
                      project.text
                    );
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
