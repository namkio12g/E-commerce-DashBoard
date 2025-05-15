import React from "react";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useBoundStore } from "@/stores";
import { AddNewProductType, ProductType } from "@/types/commonTypes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { validCategories } from "@/types/commonTypes";
import { useAddProduct, useEditProduct } from "@/api/queries/useProducts";

const images = [
    "https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/397978/pexels-photo-397978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3616991/pexels-photo-3616991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z
        .string()
        .min(1, "Category is required")
        .refine((category) => validCategories.includes(category), {
            message: "Invalid category",
        }),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    description: z.string().min(1, "Description is required"),
    isActive: z.boolean(),
});

export type productFormType = z.infer<typeof productSchema>;

export const ProductDialog: React.FC = () => {
    const inputClassName = "border-foreground";
    const closeDialog = useBoundStore.use.closeProductDialog();
    const flagDialog = useBoundStore.use.flagProductDialogOpen();

    const addProductFnnc = useBoundStore.use.addProduct();
    const updateProductFnc = useBoundStore.use.updateProduct();

    const productData: ProductType | null =
        useBoundStore.use.editProductData() ?? null;

    const addProductMutation = useAddProduct();
    const editProductMutation = useEditProduct();

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<productFormType>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
    });

    const handleAddSubmit = (data: any) => {
        if (!data) {
            toast.error("Please fill all the fields");
            return;
        }
        const image = images[Math.floor(Math.random() * images.length)];

        const newProduct: AddNewProductType = {
            ...data,
            image: image,
            date: new Date(),
        };
        addProductMutation.mutate(newProduct, {
            onSuccess: (createdProduct) => {
                addProductFnnc(createdProduct);
                toast.success("Product added successfully");
                closeDialog();
                reset();
            },
            onError: () => {
                toast.error("Failed to add product");
            },
        });
        toast.success("Product added successfully");
        closeDialog();
        reset();
    };

    const handleEditSubmit = (data: any) => {
        if (!data) {
            toast.error("Please fill all the fields");
            return;
        }
        const updatedProduct: ProductType = {
            ...productData,
            ...data,
        };
        editProductMutation.mutate(updatedProduct, {
            onSuccess: (updatedProduct) => {
                updateProductFnc(updatedProduct);
                toast.success("Product edited successfully");
            },
            onError: () => {
                toast.error("Failed to edit product");
            },
        });
        closeDialog();
        reset();
    };

    React.useEffect(() => {
        if (productData) {
            reset(productData);
        }
    }, [productData, reset]);

    if (!flagDialog) return <></>;
    return (
        <div className="dialog-wrapper">
            <Dialog
                open={flagDialog !== undefined}
                onOpenChange={(value) => {
                    if (!value) closeDialog();
                }}
            >
                <DialogContent className="sm:max-w-[425px] bg-secondary-bg">
                    <DialogHeader>
                        <DialogTitle>
                            {flagDialog === "edit" ? "Edit" : "Create"} Product
                        </DialogTitle>
                        <DialogDescription>
                            Enter your product details below and click the
                            "Submit" button to create or update your product.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(
                            flagDialog === "edit"
                                ? handleEditSubmit
                                : handleAddSubmit
                        )}
                    >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <div className="col-span-3 flex flex-col">
                                    <Input
                                        {...register("name")}
                                        id="name"
                                        placeholder="example"
                                        className={inputClassName}
                                        type="text"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <div className="col-span-3 fexl-col">
                                    <Input
                                        {...register("price")}
                                        step="any"
                                        id="price"
                                        placeholder="1"
                                        type="number"
                                        min={0}
                                        className={`col-span-3 ${inputClassName}`}
                                        defaultValue={productData?.price ?? 1}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="quantity"
                                    className="text-right"
                                >
                                    Quantity
                                </Label>
                                <div className="col-span-3 flex flex-col">
                                    <Input
                                        {...register("quantity", {
                                            setValueAs: (v) =>
                                                v === ""
                                                    ? undefined
                                                    : parseInt(v, 10),
                                        })}
                                        id="quantity"
                                        placeholder="12"
                                        type="number"
                                        min={0}
                                        className={`col-span-3 ${inputClassName}`}
                                        defaultValue={
                                            productData?.quantity ?? 1
                                        }
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Description
                                </Label>
                                <div className="col-span-3 flex flex-col">
                                    <Input
                                        {...register("description")}
                                        id="description"
                                        placeholder="halloween"
                                        type="text"
                                        className={`col-span-3 ${inputClassName}`}
                                        defaultValue={
                                            productData?.description ?? ""
                                        }
                                    />

                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Category
                                </Label>
                                <div className="col-span-3 flex flex-col">
                                    <Controller
                                        name="category"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select
                                                defaultValue={
                                                    productData?.category ?? ""
                                                }
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    className={`w-[180px] ${inputClassName}`}
                                                    id="category"
                                                >
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {validCategories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={category}
                                                                value={category}
                                                            >
                                                                {category}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="active" className="text-right">
                                    Active
                                </Label>
                                <Controller
                                    name="isActive"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <Select
                                            value={
                                                field.value ? "true" : "false"
                                            }
                                            onValueChange={(val) =>
                                                field.onChange(val === "true")
                                            }
                                        >
                                            <SelectTrigger
                                                className={`w-[180px] ${inputClassName}`}
                                                id="active"
                                            >
                                                <SelectValue placeholder="Theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    In active
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <div className="col-span-3 flex flex-col">
                                    {errors.isActive && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.isActive.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="bg-foreground hover:bg-gray-600 cursor-pointer text-background"
                            >
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
