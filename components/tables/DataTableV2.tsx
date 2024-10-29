"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import {
  Table,
  TableProps,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  TableSlots,
  SortDescriptor,
  getKeyValue,
} from "@nextui-org/react";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type TableColumnProps = {
  id: string;
  allowsSorting?: boolean;
  component: ReactNode;
};

export type TableRowProps = {
  id: string;
  className?: string;
  data: Record<string, TableCellData>;
};

export type TableCellData = {
  sortableAmount?: number | string | Date;
  component: ReactNode;
};

export type DataTableProps = TableProps & {
  columns: TableColumnProps[];
  rows: TableRowProps[];
  EmptyContent?: ReactNode | null;
};

export default function DataTable({
  columns,
  rows,
  EmptyContent,
  classNames,
  ...rest
}: DataTableProps) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

  const handleSortChange = useCallback((descriptor?: SortDescriptor) => {
    setSortDescriptor(descriptor);
  }, []);

  const items = useMemo(() => {
    if (!sortDescriptor) {
      return [...rows];
    }

    return [...rows].sort((a, b) => {
      let first = a.data[sortDescriptor.column as string].sortableAmount;
      let second = b.data[sortDescriptor.column as string].sortableAmount;

      let cmp = -1;

      if (first === undefined && second === undefined) {
        return -1;
      }

      if (first === undefined && second !== undefined) {
        cmp = 1;
      }

      if (first !== undefined && second === undefined) {
        cmp = 1;
      }

      if (first !== undefined && second !== undefined && first < second) {
        cmp = -1;
      }

      if (first !== undefined && second !== undefined && first > second) {
        cmp = 1;
      }

      if (first !== undefined && second !== undefined && first === second) {
        cmp = 0;
      }

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [rows, sortDescriptor]);

  return (
    <Table
      aria-label="sortable data table"
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
      classNames={mergeClassNames<TableSlots>(
        {
          wrapper: "!bg-transparent shadow-none p-0",
          thead: "bg-transparent",
          th: "!px-0 py-1.5 !pl-2 bg-transparent border-b border-b-stroke",
          td: "!px-0 py-1.5 !pl-2",
          tr: "border-b border-gray-800 hover:bg-white/5 cursor-pointer",
        },
        classNames,
      )}
      radius="none"
      {...rest}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.id} allowsSorting={column.allowsSorting}>
            {column.component}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody items={items} emptyContent={EmptyContent}>
        {(item) => (
          <TableRow className={item.className}>
            {(columnKey) => (
              <TableCell>
                {getKeyValue(item.data, columnKey).component}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
