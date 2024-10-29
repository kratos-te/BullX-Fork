"use client";

import { ReactNode } from "react";
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

export type TableColumnsProps = {
  id: string;
  component: ReactNode;
};

export type DataTableProps = TableProps & {
  columns: TableColumnsProps[];
  rows: (Record<string, ReactNode> & { id: string })[];
  EmptyContent?: ReactNode | null;
};

export default function DataTable({
  columns,
  rows,
  EmptyContent,
  classNames,
  ...rest
}: DataTableProps) {
  return (
    <Table
      aria-label="simple table"
      classNames={mergeClassNames<TableSlots>(
        {
          wrapper: "!bg-transparent shadow-none p-0",
          thead: "bg-transparent",
          tbody: "[&>*:nth-child(even)]:bg-tizz-background",
          th: "!px-0 py-1.5 !pl-2 bg-transparent border-b border-b-stroke",
          td: "!px-0 py-1.5 !pl-2",
          tr: "border-b border-gray-800",
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

      {rows !== null ? (
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : EmptyContent !== null ? (
        <TableBody emptyContent={EmptyContent}>{[]}</TableBody>
      ) : (
        <></>
      )}
    </Table>
  );
}
