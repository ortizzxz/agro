"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EntityModal } from "../AnimalInfoModal";
import { Button } from "@/components/ui/button";

type ColumnMapping = {
  key: string;
  label: string;
};

interface PaginationProps {
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

interface DataTableProps {
  title: string;
  columns: ColumnMapping[];
  data: any[];
  fullData?: any[];
  pagination?: PaginationProps;
  searchableKeys?: string[]; // dynamic searchable fields
}

function formatValue(key: string, value: any) {
  if (key === "trend") {
    if (value === "up") return <TrendingUp className="w-6 h-4 text-red-500" />;
    if (value === "down")
      return <TrendingDown className="w-4 h-4 text-green-600" />;
    if (value === "stable")
      return <ArrowRight className="w-4 h-4 text-gray-600" />;
  }
  return value;
}

export default function DataTable({
  title,
  columns,
  data,
  fullData,
  pagination,
  searchableKeys = [], // default to no searchable fields
}: DataTableProps) {
  const pageSizeOptions = pagination?.pageSizeOptions || [5, 10, 20];
  const defaultPageSize = pagination?.defaultPageSize || pageSizeOptions[0];

  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const lookupData = fullData || data;

  // filter data dynamically based on searchableKeys
  const filteredData = useMemo(() => {
    if (!searchTerm || searchableKeys.length === 0) return data;

    return data.filter((row) =>
      searchableKeys.some((key) =>
        String(row[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchableKeys]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, pageSize, currentPage]);

  function formatCellValue(key: string, value: any) {
    if (key.endsWith("_code") && key !== "unique_code") {
      return (
        <EntityModal
          entityCode={value}
          title={`${key
            .replace("_code", "")
            .replace(/^./, (c) => c.toUpperCase())} Details`}
          fetchEntity={async (code) => {
            const res = await fetch(`/api/animals/${code}`);
            if (!res.ok) return null;
            return res.json();
          }}
          triggerContent={
            <Button
              variant="link"
              size="sm"
              className="text-blue-700 hover:underline cursor-pointer"
            >
              {value || "-"}
            </Button>
          }
        />
      );
    }
    return formatValue(key, value);
  }

  return (
    <Card className="border-gray-200 h-full flex flex-col">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <CardTitle>{title}</CardTitle>

        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          {/* Search Bar */}
          {searchableKeys.length > 0 && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-md px-3 py-1 w-full md:w-64"
            />
          )}

          {/* Page size pills */}
          {pagination && (
            <ToggleGroup
              type="single"
              value={String(pageSize)}
              onValueChange={(value) => {
                if (value) {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }
              }}
              className="bg-gray-100 rounded-md p-1"
            >
              {pageSizeOptions.map((size) => (
                <ToggleGroupItem
                  key={size}
                  value={String(size)}
                  className="px-3 py-1 rounded-md data-[state=on]:bg-gray-300 data-[state=on]:text-gray-800"
                >
                  {size}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 min-h-0">
        <div className="overflow-auto h-full">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className="p-0 px-1 py-1">
                      {formatCellValue(col.key, row[col.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Pagination pills */}
      {pagination && (
        <div className="flex items-center justify-center gap-2 p-2 border-t border-gray-200 flex-wrap">
          {(() => {
            const pages: (number | string)[] = [];
            const maxVisible = 5;
            if (totalPages <= maxVisible + 2) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              pages.push(1);
              if (currentPage > 3) pages.push("...");
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);
              for (let i = start; i <= end; i++) pages.push(i);
              if (currentPage < totalPages - 2) pages.push("...");
              pages.push(totalPages);
            }

            return pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`px-3 py-1 rounded-md border transition-colors ${
                    isCurrent
                      ? "bg-gray-300 text-black border-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-200 border-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            });
          })()}
        </div>
      )}
    </Card>
  );
}