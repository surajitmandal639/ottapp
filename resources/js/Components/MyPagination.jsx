import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

const MyPagination = ({ currentPage, lastPage, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            onPageChange(page);
        }
    };

    return (
        <nav className="paging_simple_numbers">
            <ul className="pagination">
                {/* Previous Page */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <Link
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        data-toggle="tooltip"
                        title="Previous"
                    >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: lastPage }, (_, index) => index + 1).map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <Link
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                        >
                            {page}
                        </Link>
                    </li>
                ))}

                {/* Next Page */}
                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                    <Link
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        data-toggle="tooltip"
                        title="Next"
                    >
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

MyPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default MyPagination;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Pagination } from 'react-bootstrap';

// const MyPagination = ({ currentPage, lastPage, onPageChange }) => {
//     const handlePageChange = (page) => {
//         if (page > 0 && page <= lastPage) {
//             onPageChange(page);
//         }
//     };

//     return (
//         <Pagination>
//             {/* Previous Page */}
//             <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//             />

//             {/* Page Numbers */}
//             {Array.from({ length: lastPage }, (_, index) => index + 1).map((page) => (
//                 <Pagination.Item
//                     key={page}
//                     active={currentPage === page}
//                     onClick={() => handlePageChange(page)}
//                 >
//                     {page}
//                 </Pagination.Item>
//             ))}

//             {/* Next Page */}
//             <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === lastPage}
//             />
//         </Pagination>
//     );
// };

// MyPagination.propTypes = {
//     currentPage: PropTypes.number.isRequired,
//     lastPage: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
// };

// export default MyPagination;

