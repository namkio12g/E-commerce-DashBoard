import React, { useEffect, useState } from "react";
import { ProductType } from "@/types/commonTypes";
import { createColumnHelper, Row } from "@tanstack/react-table";
import { useDeleteProduct, useProducts } from "@/api/queries/useProducts";
import { useBoundStore } from "@/stores";
import DataTable from "@/components/Table/GenericTable";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";

const ProductsTable: React.FC = () => {
    const { data, isLoading, isError } = useProducts();
    const setProduct = useBoundStore.use.setProducts();
    const productsData = useBoundStore.use.products();
    const openEditProductDialog = useBoundStore.use.setEditProductDialogData();
    const deleteProductMutation = useDeleteProduct();
    const deleteProductFnc = useBoundStore.use.deleteProduct();

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string>("");

    const handleEditClickButton = (data: ProductType) => {
        openEditProductDialog(data);
    };

    const handleDeleteClickButton = (data: ProductType) => {
        setDeleteId(data.id);
        setIsOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteId) {
            toast.error("No product selected");
            return;
        }
        try {
            deleteProductMutation.mutate(deleteId, {
                onSuccess: () => {
                    deleteProductFnc(deleteId);
                    setIsOpenDialog(false);
                    toast.success("Product deleted");
                },
                onError: () => {
                    toast.error("Failed to delete product");
                },
            });
        } catch (error) {
            console.log(error);
            toast.error("Error deleting product");
        }
        setDeleteId("");
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
                                handleDeleteClickButton(row.original);
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
            {isLoading && <p>Loading....</p>}
            {isError && <p>Error....</p>}
            {productsData && (
                <DataTable
                    data={productsData}
                    columns={columns}
                    enableGlobalFilter={true}
                />
            )}
            <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                <DialogTrigger asChild>
                    {/* This trigger will be called programmatically, so leave empty */}
                    <span style={{ display: "none" }} />
                </DialogTrigger>
                <DialogPortal>
                    <DialogContent className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary-bg rounded shadow-lg p-6 w-[90vw] max-w-sm">
                        <DialogTitle className="text-lg font-semibold mb-2 text-foreground">
                            Confirm Delete
                        </DialogTitle>
                        <DialogDescription className="mb-4">
                            Are you sure you want to delete this product? This
                            action cannot be undone.
                        </DialogDescription>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer hover:bg-foreground/50"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                className="bg-red-500 text-white hover:bg-red-800 cursor-pointer"
                                onClick={() => handleDeleteConfirm()}
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    );
};

export default ProductsTable;
