import React, { useState, useEffect } from "react";
import IssueItem from "./component/IssueItem";
import GitPagination from "./component/GitPagination";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as types from "./redux/constants/highlight.constant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Alert, Dropdown } from "react-bootstrap";
import Logo from "./images/git-icon.png";
import Bg from "./images/quod-bg-1.png";

function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [issues, setIssues] = useState("");
  const dispatch = useDispatch();
  const currHighlightedIssue = useSelector(
    (state) => state.highlight.currHighlightedIssue
  );
  const highlightedIssues = useSelector(
    (state) => state.highlight.highlightedIssues
  );

  useEffect(() => {
    try {
      async function fetchData() {
        const data = await axios(
          `https://api.github.com/repos/rails/rails/issues?page=${pageNum}&per_page=5`
        );

        console.log("data", data);
        if (data.status === 200) {
          const link = data.headers.link;
          if (link) {
            const getTotalPage = link.match(/page=(\d+)>; rel="last"/);
            console.log("Total pages: ", getTotalPage);
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setIssues(data);
        } else {
          setErrorMsg(data.message);
        }
        setIssues(data.data);
      }
      fetchData();
      return;
    } catch (error) {
      setErrorMsg(error.message);
    }
  }, [pageNum]);

  const handleClickOnIssue = (item) => {
    if (item.id !== currHighlightedIssue) {
      // Only 1 highlighted at a time
      console.log({ id: item.id, currHighlightedIssue });
      dispatch({ type: types.SET_CURRENT_HIGHLIGHTED_ISSUE, payload: item.id });
    } else {
      dispatch({ type: types.SET_CURRENT_HIGHLIGHTED_ISSUE, payload: null });
    }
    dispatch({
      type: types.ADD_TO_HIGHLIGHT_LIST,
      payload: { title: item.title, url: item.url },
    });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navTitle">
          <img src={Logo} className="logo" alt="icon" />
          Github Issues
        </div>
        <div className="noti-style">
          <i className="far fa-bell" style={{ fontSize: "35px" }}></i>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              {highlightedIssues.length}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <span style={{ marginLeft: "5px" }}>Recent history:</span>
              {highlightedIssues.map((item) => {
                return (
                  <div className="item-wrap">
                    <Dropdown.Item
                      style={{
                        textDecoration: "underline",
                        color: "#68177b",
                      }}
                      onClick={() => window.open(`${item.url}`, "_blank")}
                    >
                      Issue: {item.title}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </div>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="main-body">
        {errorMsg && (
          <Alert
            variant="danger"
            style={{ textAlign: "center", width: "100vw", height: "15vh" }}
          >
            {errorMsg}
          </Alert>
        )}
        <div className="pagination-style">
          <GitPagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
        <IssueItem
          issues={issues}
          handleClickOnIssue={handleClickOnIssue}
          currHighlightedIssue={currHighlightedIssue}
        />
        <img src={Bg} className="img-fluid" alt="Responsive" />
      </div>
    </div>
  );
}

export default App;
