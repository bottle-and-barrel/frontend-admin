"use client";

import { LinkButton } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import LoadingError from "@/components/ui/loading-error";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { TimeFromNow } from "@/components/utility/time";
import { Advertisment, all, KEY } from "@/service/advertisment";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";

const columnHelper = createColumnHelper<Advertisment>();
const columns: ColumnDef<Advertisment>[] = [
  {
    accessorKey: "image",
    header: "Баннер",
    cell: ({ getValue }) => {
      const image = getValue<Advertisment["image"]>();
      return <Image src={image} alt="" width={200} height={56} />;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader title="Создан" column={column} />
    ),
    cell: ({ getValue }) => <TimeFromNow unix={getValue<number>()} />,
    enableHiding: false,
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => (
      <DataTableColumnHeader title="Истекает" column={column} />
    ),
    cell: ({ getValue }) => <TimeFromNow unix={getValue<number>()} />,
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

export default function AdvertismentTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [KEY],
    queryFn: all,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <LoadingError />;
  return <DataTable columns={columns} data={data!} paginate />;
}
