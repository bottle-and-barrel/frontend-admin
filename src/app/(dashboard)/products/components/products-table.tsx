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
import { TimeFromNow } from "@/components/utility/time";
import { all, KEY, Product } from "@/service/product";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import { PageSearchContainerID } from "../../globals";

const columnHelper = createColumnHelper<Product>();
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: ({ getValue }) => {
      const images = getValue<Product["images"]>();
      const fallback = "/images/placeholders/product.png";
      const src = images?.[0] ?? fallback;
      return <Image src={src} alt="" width={56} height={56} />;
    },
    meta: {
      className: "hidden w-16 p-2 sm:table-cell",
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Наименование" column={column} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader title="Категория" column={column} />
    ),
    meta: {
      className: "hidden sm:table-cell",
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: "Цена",
    cell: ({ getValue }) => `${getValue()} Р`,
  },
  {
    accessorKey: "edited_at",
    header: ({ column }) => (
      <DataTableColumnHeader title="Отредактирован" column={column} />
    ),
    cell: ({ getValue }) => <TimeFromNow unix={getValue<number>()} />,
    meta: {
      className: "hidden sm:table-cell",
    },
    enableHiding: false,
  },
  columnHelper.display({
    id: "actions",
    header: "Действия",
    cell: ({ cell }) => (
      <LinkButton href={cell.row.original.link} variant="secondary" size="icon">
        <Edit className="h-5 w-5" />
      </LinkButton>
    ),
    meta: { className: "text-right" },
  }),
];

function ProductsTableFilter() {
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

export default function ProductsTable() {
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
      slotBefore={<ProductsTableFilter />}
    />
  );
}
