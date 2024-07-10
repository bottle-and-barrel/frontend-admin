"use client";

import { LinkButton } from "@/components/ui/button";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableTextFilter,
} from "@/components/ui/data-table";
import LoadingError from "@/components/ui/loading-error";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Portal from "@/components/utility/portal";
import { all, KEY, User } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { PageSearchContainerID } from "../../globals";

const columnHelper = createColumnHelper<User>();
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Имя пользователя" column={column} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader title="Роль" column={column} />
    ),
    enableHiding: false,
  },
  columnHelper.display({
    id: "actions",
    header: "Действия",
    cell: ({ cell }) => (
      <LinkButton
        href={cell.row.original.link}
        variant="secondary"
        className="size-7 p-1"
      >
        <Edit className="h-4 w-4" />
      </LinkButton>
    ),
    meta: { className: "text-right" },
  }),
];

function UserTableFilter() {
  return (
    <Portal to={`#${PageSearchContainerID}`}>
      <DataTableTextFilter
        field="name"
        className="w-full"
        placeholder="Поиск по имени..."
      />
    </Portal>
  );
}

export default function UserTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [KEY],
    queryFn: all,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingError />;
  return (
    <DataTable
      columns={columns}
      data={data!}
      paginate
      slotBefore={<UserTableFilter />}
    />
  );
}
