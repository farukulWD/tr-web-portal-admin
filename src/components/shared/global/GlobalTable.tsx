"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Column, Footer } from "@/app/types/globalTypes";

interface GlobalTableProps {
  columns: Column[];
  data: any[];

  footers?: Footer[];
}

const GlobalTable: React.FC<GlobalTableProps> = ({
  columns,
  data,
  footers,
}) => {
  return (
    <TooltipProvider>
      <div className="rounded-lg border bg-card overflow-x-auto">
        <Table className="overflow-x-auto">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`text-${column.align || "left"} ${
                    column.width ? `w-[${column.width}]` : ""
                  }`}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50">
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`text-${column.align || "left"} ${
                      column.width ? `w-[${column.width}]` : ""
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          {/* Table Footer */}
          {footers && (
            <TableFooter className="bg-muted/50 font-medium">
              <TableRow>
                {footers.map((footer, colIndex) => (
                  <TableCell key={colIndex} className="text-center">
                    {footer.render ? footer.render(data) : footer.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default GlobalTable;
