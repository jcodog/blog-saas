"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

/**
 * Renders a customizable data table with support for dynamic columns, row selection, and empty state messaging.
 *
 * Displays tabular data using the provided column definitions and data array. Each row is clickable if an `onRowClick` callback is supplied, passing the original row data to the callback. If no data is present, a styled message is shown instead of rows.
 *
 * @param columns - Column definitions describing the table structure and cell rendering
 * @param data - Array of data objects to display as table rows
 * @param onRowClick - Optional callback invoked with the original row data when a row is clicked
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg  bg-background overflow-hidden">
      <Table className="text-sm p-4">
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer border"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow >
              <TableCell colSpan={columns.length} className="h-19 text-center text-muted-foreground bg-gray-100 dark:bg-gray-800 border-none shadow-none">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}