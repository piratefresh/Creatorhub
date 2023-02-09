import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { PaginationState, Table } from "@tanstack/react-table";
import React from "react";
import { useEffect } from "react";
import { Button } from "../Button";

import { OnChangeProps } from "./Table";
import { usePaginationRange, pagination2 } from "./usePaginationRange";

interface TablePaginationProps {
  table: Table<any>;
  pagination: PaginationState;
}

export const TablePagination = ({
  table,
  pagination,
}: TablePaginationProps) => {
  // const { items, currentPage } = usePaginationRange({
  //   currentPage: table.getState().pagination.pageIndex,
  //   totalPages: table.getPageCount(),
  // });

  const totalCount = React.useMemo(() => table.getPageCount() - 1, [table]);

  const { pages, currentPage } = pagination2(
    table.getState().pagination.pageIndex,
    table.getPageCount() - 1,
    5,
    9
  );

  const ButtonHandler = ({ page }: { page: string | number }) => {
    if (typeof page === "number") {
      const onClick = () => {
        table.setPageIndex(page);
      };

      return (
        <button
          className={`rounded-lg py-2 px-3 text-sm ${
            currentPage === page
              ? "bg-gray-100 text-primary-900"
              : "bg-transparent"
          }`}
          onClick={onClick}
          type="button"
        >
          {page}
        </button>
      );
    }

    return <button>{page}</button>;
  };

  return (
    <nav
      className="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <div className="inline-flex items-center -space-x-px text-gray-300">
        <button
          className="m-2 flex items-center gap-2 rounded-lg border border-solid border-gray-300 p-3 text-gray-300"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || currentPage === 1}
        >
          <ArrowLeftIcon className="h-5 w-5" /> Previous
        </button>
      </div>

      <div className="inline-flex items-center gap-4 -space-x-px text-gray-300">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex} of {totalCount}
          </strong>
        </span>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <ButtonHandler page={page} key={page} />
          ))}
        </div>

        {/* <select
          className="bg-brandLightBlack rounded-lg py-2 px-3 text-sm font-normal text-gray-500 dark:text-gray-400"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="ml-0 block rounded-md border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
      <button
        className="m-2 flex items-center gap-2 rounded-lg border border-solid border-gray-300 p-3 text-gray-300"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage() || totalCount === 1}
      >
        Next <ArrowRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};
