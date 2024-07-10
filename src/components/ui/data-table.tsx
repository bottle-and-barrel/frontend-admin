"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as ReactTable,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowDownUpIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  EyeOffIcon,
  SearchX,
} from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Input, InputProps } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableContextProps {
  table: ReactTable<RowData>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginate?: boolean;
  selectable?: boolean;

  slotBefore?: React.ReactNode;
  slotAfter?: React.ReactNode;
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  multiSort?: boolean;
}

interface DataTablePaginationProps {
  selectable?: boolean;
}

// TODO: add field type - column accessor key
interface DataTableTextFilterProps extends InputProps {
  field: string;
}

const DataTableContext = React.createContext<DataTableContextProps | null>(
  null
);

const useDatatableContext = () => {
  const context = React.useContext(DataTableContext);
  if (context === null)
    throw new Error(
      "`useDatatableContext` was used outside of DataTableContext"
    );
  return context;
};

function DataTableEmpty<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-24 text-center text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <SearchX className="size-12" />
          Список пуст
        </div>
      </TableCell>
    </TableRow>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginate,
  selectable,
  slotBefore,
  slotAfter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: { columnFilters, sorting },
  });

  return (
    <div>
      {/* @ts-ignore */}
      <DataTableContext.Provider value={{ table }}>
        {slotBefore}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.className}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <DataTableEmpty columns={columns} data={data} />
            )}
          </TableBody>
        </Table>
        {paginate && <DataTablePagination selectable={selectable} />}
        {slotAfter}
      </DataTableContext.Provider>
    </div>
  );
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  multiSort,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownUpIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getIsSorted() && (
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <ArrowDownUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              По умолчанию
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false, multiSort)}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            По возрастанию
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true, multiSort)}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            По убыванию
          </DropdownMenuItem>

          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Скрыть
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function DataTablePagination({ selectable }: DataTablePaginationProps) {
  const { table } = useDatatableContext();

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {selectable ? (
        <div className="flex-1 text-sm text-muted-foreground">
          Выбрано {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} записей.
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Записей на страницу</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center text-sm font-medium sm:w-[150px]">
            Страница {table.getState().pagination.pageIndex + 1} из{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">В начало</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Назад</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Вперед</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">В конец</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataTableTextFilter({
  field,
  ...props
}: DataTableTextFilterProps) {
  const { table } = useDatatableContext();

  return (
    <Input
      value={(table.getColumn(field)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(field)?.setFilterValue(event.target.value)
      }
      {...props}
    />
  );
}
