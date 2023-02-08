import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";
import { IndeterminateCheckbox } from "../Checkbox";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { Badge } from "../Badge";
import { OnlineStatusIndicator } from "../Avatar/Avatar";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
};

export function encodeSorting(sorting: SortingState) {
  const result = sorting.map((item) => {
    if (item.desc) {
      return `${item.id}-desc`;
    }
    return `${item.id}-asc`;
  });
  return result.join(",");
}

export default meta;
type Story = StoryObj<typeof Table>;

const columnHelper = createColumnHelper<Person>();

const COLUMNS: ColumnDef<Person, any>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table?.getIsSomeRowsSelected(),
            onChange: table?.getToggleAllRowsSelectedHandler(),
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <IndeterminateCheckbox
            {...{
              checked: row?.getIsSelected(),
              disabled: !row?.getCanSelect(),
              indeterminate: row?.getIsSomeSelected(),
              onChange: row?.getToggleSelectedHandler(),
            }}
          />
        </div>
      );
    },
  },
  columnHelper.accessor((row) => row.name, {
    id: "name",
    size: 1,
    cell: (info) => (
      <span className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </span>
    ),
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("message", {
    id: "message",
    header: () => <span>Message</span>,
    footer: (info) => info.column.id,
    cell: (info) => (
      <Badge variant="success" className="flex flex-row items-center gap-2">
        <OnlineStatusIndicator isOnline={true} className="h-2 w-2" />
        Active
      </Badge>
    ),
  }),
  columnHelper.accessor("role", {
    header: () => <span>Role</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("id", {
    header: "View",
    footer: (info) => info.column.id,
    cell: (info) => (
      <button>View</button>
      //   <Link href={`/user/${info.getValue()}`}>
      //     <Button size="large">View</Button>
      //   </Link>
    ),
  }),
];

export const Primary: Story = {
  args: {},
  render: (args) => {
    // TABLE STATE
    const data = React.useMemo(() => makeData(10), []);
    const columns = React.useMemo(() => COLUMNS, []);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
      {}
    );

    const [{ pageIndex, pageSize }, setPagination] =
      React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
      });

    const pagination = React.useMemo(
      () => ({
        pageIndex,
        pageSize,
      }),
      [pageIndex, pageSize]
    );

    // React.useEffect(() => {
    //   setParams(
    //     {
    //       ...params,
    //       page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex,
    //       pageSize: pagination.pageSize ?? 10,
    //       // q: query || undefined,
    //       sort: encodeSorting(sorting) || undefined,
    //     },
    //     "replace"
    //   );
    // }, [pagination, params, setParams, sorting]);

    return (
      <Table
        pagination={pagination}
        columns={columns}
        data={data}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
      />
    );
  },
};
