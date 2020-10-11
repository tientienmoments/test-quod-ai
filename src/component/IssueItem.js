import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import IssueImg from "../images/quod-bg-3.png";

const IssueItem = ({ issues }) => {
  console.log("checkkk", issues);
  const dispatch = useDispatch();

  return (
    <div>
      {issues.length
        ? issues.map((item) => {
            return (
              <div className="issue-wrap" style={{ cursor: "pointer" }}>
                <div className="issue-img-wrap">
                  <img src={IssueImg} alt="issue-img" />
                </div>
                <div
                  // key={item.id}
                  // onCLick={handleHighlight}
                  className="issue-detail"
                  onClick={(e) => e.currentTarget.classList.toggle("active")}
                >
                  <p> Issue ID: {item.id}</p>
                  <p>Title: {item.title}</p>
                </div>
              </div>
            );
          })
        : "No Repos"}
    </div>
  );
};

export default IssueItem;
