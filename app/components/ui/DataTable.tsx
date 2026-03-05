import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

type ColumnMapping = {
    key: string;
    label: string;
};

interface DataTableProps {
    title: string;
    columns: ColumnMapping[];
    data: any[];
}

function formatValue(key: string, value: any) {
    if (key === "trend") {
        if (value === "up") return <TrendingUp className="w-6 h-4 text-red-500" />;
        if (value === "down") return <TrendingDown className="w-4 h-4 text-green-600" />;
        if (value === "stable") return <ArrowRight className="w-4 h-4 text-gray-600" />;
    }

    return value;
}

export default function DataTable({ title, columns, data }: DataTableProps) {
    return (
        <Card className="border-gray-200 h-full flex flex-col">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            {/* CardContent fills the rest */}
            <CardContent className="p-0 flex-1 min-h-0">
                {/* This wrapper scrolls if content overflows */}
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
                            {data.map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                                        } hover:bg-gray-200`}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>{formatValue(col.key, row[col.key])}</TableCell>))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}