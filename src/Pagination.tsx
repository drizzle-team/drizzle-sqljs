import React from 'react';
import classnames from 'classnames';
import './pagination.scss';
import { DOTS, usePagination } from './hooks/usePagination';
import { PaginationNumber } from './OrdersPage';

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    className,
  } = props;
  let p = 0;
  if (currentPage === 1) {
    p = 2;
  } else if (currentPage === 4) {
    p = 3.5;
  } else if (currentPage === 5) {
    p = 4;
  } else if (currentPage === 2) {
    p = 2.5;
  } else {
    p = 3;
  }
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: p,
    pageSize,
  });

  // @ts-ignore
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // @ts-ignore
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      />
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <PaginationNumber
            active={currentPage === pageNumber}
            // className={classnames('pagination-item', {
            //   selected: pageNumber === currentPage,
            // })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationNumber>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      />
    </>
  );
};

export default Pagination;
