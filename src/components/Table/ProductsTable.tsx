import React from "react";
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
// interface GlobalFilterProps {
//     globalFilter: string;
//     setGlobalFilter: (value: string) => void;
// }

export interface DataTableProps<TData> {
    data: TData[];
    columns?: ColumnDef<TData>[];
}

export const DataTale = <TData,>({
    data = [],
    columns = [],
}: DataTableProps<TData>) => {
    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
    });
    return (
        <>
            <table
                className={`w-full  border-collapse w-${table.getTotalSize()}`}
            >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        key={header.id}
                                        className={`border-1 border-slate-500 p-2 cursor-pointer`}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                    >
                                        <div className="w-fit">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
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
        </>
    );
};
