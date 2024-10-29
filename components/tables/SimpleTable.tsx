"use client";

import { ReactNode, MouseEventHandler } from "react";
import {
  Table,
  TableProps,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  TableSlots,
} from "@nextui-org/react";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type SimpleTableProps = TableProps & {
  columns: { id: string; component: ReactNode }[];
  rows: (Record<string, ReactNode> & { id: string })[];
  onClickRow?: MouseEventHandler<HTMLTableRowElement>;
};

export default function SimpleTable({
  columns,
  rows,
  classNames,
  onClickRow,
  ...rest
}: SimpleTableProps) {
  return (
    <Table
      aria-label="simple table"
      classNames={mergeClassNames<TableSlots>(
        {
          wrapper: "!bg-transparent shadow-none p-0",
          thead: "bg-transparent",
          th: "!px-0 py-1.5 bg-transparent border-b border-b-stroke",
          td: "!px-0 py-1.5",
        },
        classNames,
      )}
      radius="none"
      {...rest}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.id}>{column.component}</TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} onClick={onClickRow}>
            {columns.map((column) => (
              <TableCell key={column.id}>{row[column.id]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
