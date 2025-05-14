import React, { useState, memo, useMemo, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";
import "./index.scss";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { debounce } from "lodash";

export interface DataTableProps<TData> {
    data: TData[];
    columns?: ColumnDef<TData>[];
    enableGlobalFilter?: boolean;
}

function GlobalFilter({
    globalFilter,
    setGlobalFilter,
}: {
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
}) {
    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                setGlobalFilter(query);
            }, 700),
        []
    );
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);
    return (
        <div className="mb-2 w-40 ">
            <Input
                defaultValue={""}
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder="Search all columns..."
                className="border px-2 py-1 rounded w-full border-foreground! bg-secondary-bg"
            />
        </div>
    );
}

const DataTable = <TData,>({
    data = [],
    columns = [],
    enableGlobalFilter = false,
}: DataTableProps<TData>) => {
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 3,
            },
        },
    });
    return (
        <>
            {enableGlobalFilter && (
                <GlobalFilter
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            )}
            <div className="w-full overflow-x-scroll">
                <table
                    className={`data-table  border-collapse bg-secondary-bg `}
                >
                    <thead className="table-header overflow-x-hidden">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            key={header.id}
                                            className={`header-cell border-1 border-slate-500 p-2 cursor-pointer`}
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            <div className="w-fit">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                                {header.column.getCanResize() && (
                                                    <div
                                                        {...{
                                                            onDoubleClick: () =>
                                                                header.column.resetSize(),
                                                            onMouseDown:
                                                                header.getResizeHandler(),
                                                            onTouchStart:
                                                                header.getResizeHandler(),
                                                            className: `resizer ${
                                                                table.options
                                                                    .columnResizeDirection
                                                            } ${
                                                                header.column.getIsResizing()
                                                                    ? "isResizing"
                                                                    : ""
                                                            } bg-theme-primary`,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className="border-1 border-slate-500 p-2 w-[20px]"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center gap-2 mt-4 mb-3">
                <Button
                    className="px-2 py-1 border rounded bg-foreground text-background hover:bg-foreground/50 hover:text-white cursor-pointer"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span>
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <Button
                    className="px-2 py-1 border rounded bg-foreground text-background hover:bg-foreground/50 hover:text-white cursor-pointer"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
export default memo(DataTable);
