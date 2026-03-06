"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import GenericModal from "../modal/GenericModal";

type ColumnMapping = { key: string; label: string; width?: number };

interface PaginationProps {
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

interface DataTableProps<T> {
  title: string;
  columns: ColumnMapping[];
  data: T[];
  fullData?: T[];
  pagination?: PaginationProps;
  searchableKeys?: (keyof T)[];

  /**
   * Optional function to define which modal opens for a row or cell.
   * Return null if no modal should open.
   */
  getRowModal?: (row: T, colKey?: string) => { title: string; content: React.ReactNode } | null;
}

function formatValue(key: string, value: any) {
  if (key === "trend") {
    if (value === "up") return <TrendingUp className="w-6 h-4 text-red-500" />;
    if (value === "down") return <TrendingDown className="w-4 h-4 text-green-600" />;
    if (value === "stable") return <ArrowRight className="w-4 h-4 text-gray-600" />;
  }
  return value;
}

export default function DataTable<T>({
  title,
  columns,
  data,
  pagination,
  searchableKeys = [],
  getRowModal,
}: DataTableProps<T>) {
  const pageSizeOptions = pagination?.pageSizeOptions || [5, 10, 20];
  const defaultPageSize = pagination?.defaultPageSize || pageSizeOptions[0];

  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

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

  const handleRowClick = (row: T, colKey?: string) => {
    if (!getRowModal) return;
    const modalConfig = getRowModal(row, colKey);
    if (!modalConfig) return;
    setModalTitle(modalConfig.title);
    setModalContent(modalConfig.content);
    setModalOpen(true);
  };

  const formatCellValue = (row: T, colKey: string) => {
    // Ask getRowModal for this cell only
    const modalConfig = getRowModal?.(row, colKey);

    if (modalConfig) {
      return (
        <Button
          variant="link"
          size="sm"
          className="text-blue-700 hover:bg-gray-400 hover:text-white rounded-sm cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // prevent row-level click
            handleRowClick(row, colKey);
          }}
        >
          {row[colKey] || "-"}
        </Button>
      );
    }

    // Regular display, not clickable
    return row[colKey] ?? "-";
  };

  return (
    <>
      <Card className="border-gray-200 h-full flex flex-col">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>{title}</CardTitle>

          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
            {searchableKeys.length > 0 && (
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md px-3 py-1 w-full md:w-50"
              />
            )}

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
          <div className="h-full flex flex-col min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <Table className="w-full">
                <TableHeader className="sticky top-0 bg-gray-50 z-10">
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        style={{ width: col.width }}
                      >
                        {col.label}
                      </TableHead>))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } hover:bg-gray-200 cursor-pointer`}
                      onClick={() => {
                        const rowModal = getRowModal?.(row);
                        if (rowModal) handleRowClick(row);
                      }}
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className="p-0 px-1 py-1"
                          onClick={(e) => {
                            const cellModal = getRowModal?.(row, col.key);
                            if (cellModal) {
                              e.stopPropagation();
                              handleRowClick(row, col.key);
                            }
                          }}
                        >
                          {formatCellValue(row, col.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>


        {/* Pagination */}
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
                if (page === "...") return <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>;
                const isCurrent = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`px-3 py-1 rounded-md border transition-colors ${isCurrent ? "bg-gray-300 text-black border-gray-400" : "bg-white text-gray-700 hover:bg-gray-200 border-gray-200"
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

      {/* Generic Modal */}
      <GenericModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </GenericModal>
    </>
  );
}