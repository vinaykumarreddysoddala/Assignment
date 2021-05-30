import React from 'react';
import left from '../../assets/left.svg';
import doubleLeft from '../../assets/double-left.svg';
import right from '../../assets/right.svg';
import doubleRight from '../../assets/double-right.svg';

const Pagination = ({ activePage, handlePaginate, lastPage }) => {

    return (
        <div className="pagination-container">
            <div className="pagination-section display-flex">
                <span
                    className="page-details"
                    onClick={e => { e.preventDefault(); handlePaginate(1) }}
                    style={{ display: activePage === 1 ? "none" : "" }}
                >
                    <img src={doubleLeft} alt="double-left"
                    />
                </span>
                <span
                    className="page-details"
                    onClick={e => { e.preventDefault(); handlePaginate(activePage - 1) }}
                    style={{ display: activePage === 1 ? "none" : "" }}
                >
                    <img src={left} alt="left" />
                </span>
                <span className="page-details page-number">{activePage}</span>
                <span
                    className="page-details"
                    onClick={e => { e.preventDefault(); handlePaginate(activePage + 1) }}
                    style={{ display: activePage === lastPage ? "none" : "" }}
                >
                    <img src={right} alt="right" />
                </span>
                <span
                    className="page-details border-right-none"
                    onClick={e => { e.preventDefault(); handlePaginate(lastPage) }}
                    style={{ display: activePage === lastPage ? "none" : "" }}
                >
                    <img src={doubleRight} alt="double-right" />
                </span>
            </div>
        </div>
    );
};

export default Pagination;
