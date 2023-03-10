import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
  RowSelectionState,
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";
import { Checkbox } from "../Checkbox";
import { Badge } from "../Badge";
import { OnlineStatusIndicator } from "../Avatar/Avatar";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

type PropsTableInternal = {
  getIsAllRowsSelected: () => boolean;
  getIsSomeRowsSelected: () => boolean;
};

const columnHelper = createColumnHelper<Person>();

function verifyIndeterminate(table: PropsTableInternal) {
  if (table.getIsAllRowsSelected()) {
    return true;
  }

  if (table.getIsSomeRowsSelected()) {
    return "indeterminate";
  }

  return false;
}

const COLUMNS: ColumnDef<Person, any>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          {...{
            checked: verifyIndeterminate(table),
            indeterminate: table?.getIsSomeRowsSelected(),
            onClick: table?.getToggleAllRowsSelectedHandler(),
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <Checkbox
            {...{
              checked: row?.getIsSelected(),
              disabled: !row?.getCanSelect(),
              indeterminate: row?.getIsSomeSelected(),
              onClick: row?.getToggleSelectedHandler(),
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
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
      {}
    );

    const [{ pageIndex, pageSize }, setPagination] =
      React.useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
      });

    const pagination = React.useMemo(
      () => ({
        pageIndex,
        pageSize,
      }),
      [pageIndex, pageSize]
    );

    return (
      <Table
        columns={columns}
        data={data}
        pagination={pagination}
        pageCount={Math.ceil(data.length / pageSize) + 1}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
      />
    );
  },
};
