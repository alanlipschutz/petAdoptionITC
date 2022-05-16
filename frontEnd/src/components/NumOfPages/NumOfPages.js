import React from "react";
import { Pagination } from "react-bootstrap";

function NumOfPages({ pages, page, onGetPets }) {
  const pagesArray = Array.from({ length: pages }, (_, index) => {
    return index + 1;
  });

  function prevPage(e) {
    let prePage = page - 1;
    if (prePage < 1) {
      prePage = 1;
    }
    onGetPets(e, prePage);
  }
  function nextPage(e) {
    let nexPage = page + 1;
    if (nexPage > pages) {
      nexPage = pages;
    }
    onGetPets(e, nexPage);
  }
  function handleClick(e, pageNum) {
    onGetPets(e, pageNum);
  }
  return (
    <Pagination>
      <Pagination.Prev onClick={prevPage} disabled={page === 1} />
      {pagesArray.map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={pageNum === page}
          onClick={(e) => handleClick(e, pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={nextPage} disabled={page === pages} />
    </Pagination>
  );
}

export default NumOfPages;
