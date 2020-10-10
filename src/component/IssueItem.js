import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

const IssueItem = ({ issues }) => {
  console.log("checkkk", issues);
  const dispatch = useDispatch();

  return (
    <div>
      {issues.length
        ? issues.map((item) => {
            return (
              <Container
                className="issue-wrap"
                // key={item.id}
                // onCLick={handleHighlight}
                onClick={(e) => e.currentTarget.classList.toggle("active")}
                style={{ cursor: "pointer" }}
              >
                <p>id: {item.id}</p>
                <p>Title: {item.title}</p>
              </Container>
            );
          })
        : "No Repos"}
    </div>
  );
};

export default IssueItem;
