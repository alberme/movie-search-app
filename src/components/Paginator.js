// import { useState } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/Paginator.css';

/**
  The OMDb API uses pagination and only returns 10 movie results per page.
  Add a Paginator as shown below that displays the page count and the current page.
  The paginator should also have buttons to display search results for the previous and next pages.
 */
const Paginator = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 10)
  const prevButtonCheck = () => currentPage > 1;
  const nextButtonCheck = () => currentPage < totalPages;
  const prevClassName = prevButtonCheck() ? "paginator-button-enabled" : "paginator-button-disabled";
  const nextClassName = nextButtonCheck() ? "paginator-button-enabled" : "paginator-button-disabled";
  // `paginator-button-${prevButtonCheck() ? "enabled" : "disabled"}`
  // keep track of totalResults, do the math to figure out how many total pages we need
  // on page change should set movielist to a loading state 
  const handleClick = (e) => {
    const { name } = e.target;

    if (name !== "prev" && name !== "next") {
      // just for debugging
      console.warn(`Unrecognized name ${name} passed in to Paginator`);
    } else if (name === "prev" && prevButtonCheck()) {
      onPageChange(currentPage - 1);
    } else if (name === "next" && nextButtonCheck()) {
      onPageChange(currentPage + 1);
    } else {
      // more debugging
      console.log(`Paginator reached limit! ${currentPage} of ${totalPages}`);
    }
  }

  return (
    <div className="paginator-container">
      <h5>Page {currentPage} of {totalPages}</h5>
      <div className="paginator-button-container">
        <button className={prevClassName} disabled={!prevButtonCheck()} name="prev" onClick={handleClick}>&lt;</button>
        <button className={nextClassName} disabled={!nextButtonCheck()} name="next" onClick={handleClick}>&gt;</button>
      </div>
    </div>
  )
}

Paginator.propTypes = {
  onPageChange: PropTypes.func,
  totalResults: PropTypes.number,
  currentPage: PropTypes.number
}

export default Paginator;
