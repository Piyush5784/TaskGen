"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { ManualTaskTableSheet } from "./table-sidebar";

export type Task = {
    id: string;
    header: string;
    type: string;
    status: string;
    reviewer: string;
    description: string;
};

interface ManualTaskTableProps {
    tasks: Task[];
    isLoading: boolean;
}

const ManualTaskTable: React.FC<ManualTaskTableProps> = ({ tasks, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(tasks.length / rowsPerPage);

    const paginatedTasks = tasks.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleChangeRowsPerPage = (value: string) => {
        setRowsPerPage(parseInt(value));
        setCurrentPage(1); // reset to first page
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);

    return (
        <div className="overflow-auto rounded-lg border border-border shadow-sm mt-6">
            {isLoading ? (
                <div className="animate-pulse">

                    <div className="animate-pulse">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left text-muted-foreground">
                                    <th className="px-4 py-2">
                                        <div className="h-4 bg-muted/50 rounded"></div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="h-4 bg-muted/50 rounded"></div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="h-4 bg-muted/50 rounded"></div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="h-4 bg-muted/50 rounded"></div>
                                    </th>
                                    <th className="px-4 py-2">
                                        <div className="h-4 bg-muted/50 rounded"></div>
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[...Array(5)].map((_, index) => (
                                    <tr key={index} className="hover:bg-muted/30 transition">
                                        <td className="px-4 py-2">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <div className="h-4 bg-muted/50 rounded"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <table className="min-w-full divide-y divide-border text-sm">
                    <thead className="bg-muted">
                        <tr className="text-left text-muted-foreground">
                            <th className="px-4 py-2"><Checkbox /></th>
                            <th className="px-4 py-2">Header</th>
                            <th className="px-4 py-2">Section Type</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Reviewer</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {paginatedTasks.map((task) => (
                            <tr key={task.id} className="hover:bg-muted/30 transition">
                                <td className="px-4 py-2"><Checkbox /></td>
                                <ManualTaskTableSheet item={task} />
                                <td className="px-4 py-2">
                                    <span className="inline-block bg-muted px-2 py-1 rounded-md">{task.type}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${task.status === "Done"
                                        ? "text-green-500 bg-green-500/10"
                                        : "text-blue-500 bg-blue-500/10"
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${task.status === "Done" ? "bg-green-500" : "bg-blue-500 animate-pulse"
                                            }`}></span>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {task.reviewer === "Assign reviewer" ? (
                                        <Select>
                                            <SelectTrigger className="bg-background border rounded px-2 py-1 text-sm">
                                                <span>{task.reviewer}</span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Assign reviewer">Assign reviewer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <span>{task.reviewer}</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <button className="text-muted-foreground hover:text-foreground">⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
                <span>0 of {tasks.length} row(s) selected.</span>
                <div className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <div><Select value={String(rowsPerPage)} onValueChange={handleChangeRowsPerPage}>
                        <SelectTrigger className="bg-background border rounded px-2 py-1 text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <span className="pl-4">Page {currentPage} of {totalPages}</span>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={goToFirstPage}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={goToLastPage}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualTaskTable;
