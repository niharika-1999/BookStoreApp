import React from "react";
import "../styles/books.scss";

const PaginationPage = ({
  booksPerPage,
  totalBooks,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div key={number} className="page-item">
          <a
            href="#/"
            class={currentPage === number ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }}
          >
            {number}{" "}
          </a>
        </div>
      ))}{" "}
    </div>
  );
};

export default PaginationPage;