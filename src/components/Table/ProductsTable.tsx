import React, { useEffect } from "react";
import { ProductType } from "@/types/commonTypes";
import { createColumnHelper, ColumnDef, Row } from "@tanstack/react-table";
import { useProducts } from "@/api/queries/useProducts";
import { useBoundStore } from "@/stores";
import DataTable from "@/components/Table/GenericTable";
import { Button } from "../ui/button";

const ProductsTable: React.FC = () => {
    const { data, isLoading, isError } = useProducts();
    const setProduct = useBoundStore.use.setProducts();
    const productsData = useBoundStore.use.products();
    const openEditProductDialog = useBoundStore.use.setEditProductDialogData();

    const handleEditClickButton = (data: ProductType) => {
        openEditProductDialog(data);
    };
    const columns = React.useMemo(() => {
        const columnHelper = createColumnHelper<ProductType>();
        const columnDefs = [
            columnHelper.accessor("id", {
                cell: (info) => info.getValue(),
                enableResizing: false,
                enableSorting: false,
                footer: (info: { column: { id: string } }) => info.column.id,
            }),
            columnHelper.accessor("name", {
                id: "name",
                enableResizing: true,
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => <span>Product Name</span>,
            }),
            columnHelper.accessor("category", {
                header: () => "Category",

                enableResizing: false,
                cell: (info) => info.renderValue(),
            }),
            columnHelper.accessor("price", {
                header: () => <span>Price</span>,
                enableResizing: false,
                enableSorting: true,
                cell: (info) => <p>${info.getValue()}</p>,
            }),
            columnHelper.accessor("quantity", {
                header: "Quantity",
                enableSorting: true,
                enableResizing: false,
            }),
            columnHelper.accessor("isActive", {
                header: "Active",
                enableResizing: false,
            }),
            columnHelper.accessor("date", {
                header: "Created Date",
                enableResizing: false,
                cell: (info) => (
                    <p>
                        {new Date(info.getValue()).toLocaleDateString("en-GB")}
                    </p>
                ),
            }),
            columnHelper.accessor("image", {
                header: "thumbnail",
                enableSorting: false,
                cell: (info) => <img src={info.getValue()} alt="thumbnail" />,
            }),
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }: { row: Row<ProductType> }) => (
                    <div className="flex gap-2">
                        <Button
                            className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-500/50"
                            onClick={() => {
                                console.log(row.original);
                                handleEditClickButton(row.original);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-500/50"
                            onClick={() => {
                                alert(`Remove product ${row.original.id}`);
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                ),
                enableResizing: false,
            },
        ];
        return columnDefs;
    }, []);

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);
    return (
        <>
            {" "}
            {isLoading && <p>Loading....</p>}
            {isError && <p>Error....</p>}
            {productsData && (
                <DataTable
                    data={productsData}
                    columns={columns}
                    enableGlobalFilter={true}
                />
            )}
        </>
    );
};

export default ProductsTable;
