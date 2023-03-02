import Link from "next/link";
import React from "react";
import { Badge, Button, Checkbox, Table } from "ui";
import { OnlineStatusIndicator } from "ui/components/Avatar/Avatar";
import {
  ColumnDef,
  createColumnHelper,
  makeData,
  PaginationState,
  RowSelectionState,
} from "ui/components/Table";
import { Person } from "ui/components/Table/makeData";

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
    maxSize: 30,
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
  columnHelper.accessor((row) => row.user.name, {
    id: "name",
    cell: (info) => (
      <span className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </span>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("message", {
    id: "message",
    header: () => <span>Message</span>,

    cell: (info) => (
      <Badge variant="success" className="flex flex-row items-center gap-2">
        <OnlineStatusIndicator isOnline={true} className="h-2 w-2" />
        Active
      </Badge>
    ),
  }),
  columnHelper.accessor("user.role", {
    header: () => <span>Role</span>,
  }),
  columnHelper.accessor("user.email", {
    header: () => <span>Email</span>,
  }),

  columnHelper.accessor("user.id", {
    header: "View",
    cell: (info) => (
      <Link href={`/user/${info.getValue()}`}>
        <Button size="large">View</Button>
      </Link>
    ),
  }),
];

export const TeamMemberTable = ({ data, title }) => {
  console.log("data: ", data);
  // TABLE STATE
  const columns = React.useMemo(() => COLUMNS, []);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

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
      title={title}
    />
  );
};
