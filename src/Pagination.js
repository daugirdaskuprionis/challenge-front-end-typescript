import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number}>
            <a href="#" onClick={() => paginate(number)}  className={ 
              number === currentPage ? "pageNumber selected" : "pageNumber"}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination;