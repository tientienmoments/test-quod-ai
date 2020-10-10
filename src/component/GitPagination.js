import React from "react";
import { Pagination } from "react-bootstrap";
const GitPagination = ({ pageNum, setPageNum, totalPageNum }) => {
  const handleClickOnPrev = () => {
    if (pageNum > 1) {
      setPageNum((num) => num - 1);
    }
  };
  const handleClickOnNext = () => {
    if (pageNum < totalPageNum) {
      setPageNum((num) => num + 1);
    }
  };
  return (
    <div>
      <Pagination>
        {pageNum !== 1 && <Pagination.Prev onClick={handleClickOnPrev} />}
        <Pagination.Next onClick={handleClickOnNext} />
      </Pagination>
    </div>
  );
};

export default GitPagination;
