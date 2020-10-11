import React, { useState, useEffect } from "react";
import IssueItem from "./component/IssueItem";
import GitPagination from "./component/GitPagination";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Alert } from "react-bootstrap";
import Logo from "./images/git-icon.png";
import Bg from "./images/quod-bg-1.png";

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [issues, setIssues] = useState("");

  useEffect(() => {
    setLoading(true);
    try {
      async function fetchData() {
        const data = await axios(
          `https://api.github.com/repos/rails/rails/issues?page=${pageNum}&per_page=5`
        );

        console.log("dataaaa", data);
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
    setLoading(false);
  }, [pageNum]);

  return (
    <div>
      <div className="navbar">
        <div className="navTitle">
          <img src={Logo} className="logo" alt="icon" />
          Github Issues
        </div>
        <i className="far fa-bell" style={{ fontSize: "35px" }}></i>
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

        <IssueItem issues={issues} />

        <img src={Bg} alt="bground" className="bg-img" />
      </div>
    </div>
  );
}

export default App;
