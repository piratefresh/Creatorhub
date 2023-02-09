import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TablePagination } from "./TablePagination";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Badge } from "../Badge";

export interface OnChangeProps {
  pagination: PaginationState;
  query?: string;
  sortBy?: SortingState;
  filters?: { [key: string]: any };
}

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  onChange?: (values: OnChangeProps) => void;
  pagination: PaginationState;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState>;
  searchQuery?: string | null;
  setSorting?: OnChangeFn<SortingState>;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
};

export const Table = <TData extends object>({
  data,
  columns,
  pagination,
  pageCount,
  onChange,
  setPagination,
  setRowSelection,
  searchQuery,
  setSorting,
  sorting,
  rowSelection,
}: TableProps<TData>) => {
  // const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      pagination,
    },
    pageCount: pageCount ?? -1,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualPagination: true,
  });

  return (
    <div className="relative max-w-7xl overflow-x-auto border border-gray-500 shadow-md sm:rounded-lg">
      <div className="flex flex-row items-center gap-4 px-5 py-5">
        <h1 className="text-lg text-gray-100">Team Members</h1>
        <Badge variant="primary">100 Users</Badge>
      </div>

      <table className="w-full text-left text-xs">
        <thead className="border-b border-gray-800 text-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="whitespace-nowrap px-5 py-5"
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width:
                      header.getSize() !== 0 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-1"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronDownIcon className="h-5 w-5" />,
                        desc: <ChevronUpIcon className="h-5 w-5" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="border-b border-gray-800 px-5 py-5 text-gray-300"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="w-4 p-5" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination table={table} pagination={pagination} />
    </div>
  );
};
