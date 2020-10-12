import React from "react";
import IssueImg from "../images/quod-bg-3.png";

const IssueItem = ({ issues, handleClickOnIssue, currHighlightedIssue }) => {
  return (
    <div>
      {issues.length ? (
        issues.map((item) => {
          return (
            <div
              key={item.id}
              className="issue-wrap"
              style={{ cursor: "pointer" }}
            >
              <div className="issue-img-wrap">
                <img src={IssueImg} alt="issue-img" className="img-fluid" />
              </div>
              <div
                className={
                  item.id === currHighlightedIssue
                    ? "issue-detail active"
                    : "issue-detail"
                }
                onClick={() => handleClickOnIssue(item)}
              >
                <p> Issue ID: {item.id}</p>
                <p>Title: {item.title}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="load-style">No repos</div>
      )}
    </div>
  );
};

export default IssueItem;
