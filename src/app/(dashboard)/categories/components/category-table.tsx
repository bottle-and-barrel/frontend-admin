"use client";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableTextFilter,
} from "@/components/ui/data-table";
import LoadingError from "@/components/ui/loading-error";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Portal from "@/components/utility/portal";
import { all, Category, KEY } from "@/service/category";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { PageSearchContainerID } from "../../globals";

const columnHelper = createColumnHelper<Category>();
const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Название категории" column={column} />
    ),
  },
  columnHelper.display({
    id: "total",
    header: "Всего товаров",
    cell: ({ cell }) => (
      <Badge className="bg-secondary text-secondary-foreground">
        {cell.row.original.products.length}
      </Badge>
    ),
    meta: { className: "hidden sm:table-cell" },
  }),
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

function CategoryTableFilter() {
  return (
    <Portal to={`#${PageSearchContainerID}`}>
      <DataTableTextFilter
        field="name"
        className="w-full"
        placeholder="Поиск по названию..."
      />
    </Portal>
  );
}

export default function CategoryTable() {
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
      slotBefore={<CategoryTableFilter />}
    />
  );
}
