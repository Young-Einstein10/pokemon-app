import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface IPaginationProps {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
}

const Pagination = ({ pageCount, handlePageClick }: IPaginationProps) => {
  return (
    <div className="flex mt-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRightIcon />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<ChevronLeftIcon />}
        renderOnZeroPageCount={null}
        // Styles
        className="flex items-center gap-2"
        pageLinkClassName="p-0 flex items-center justify-center w-8 h-8 rounded-md"
        activeLinkClassName="bg-black text-white rounded-md"
        previousLinkClassName=""
        nextLinkClassName=""
        disabledLinkClassName="opacity-30"
      />
    </div>
  );
};

export default Pagination;
