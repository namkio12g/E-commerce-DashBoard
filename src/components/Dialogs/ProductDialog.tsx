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
import { ProductType } from "@/types/commonTypes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { validCategories } from "@/types/commonTypes";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z
        .string()
        .min(1, "Category is required")
        .refine((category) => validCategories.includes(category), {
            message: "Invalid category",
        }),
    price: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().min(0, "Price must be a positive number")
    ),
    quantity: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().min(1, "Quantity must be at least 1")
    ),
    description: z.string().min(1, "Description is required"),
    isActive: z.boolean(),
});

export type productFormType = z.infer<typeof productSchema>;

export const ProductDialog: React.FC = () => {
    const inputClassName = "border-foreground";
    const closeDialog = useBoundStore.use.closeProductDialog();
    const flagDialog = useBoundStore.use.flagProductDialogOpen();
    const productData: ProductType | null =
        useBoundStore.use.editProductData() ?? null;
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<productFormType>({ resolver: zodResolver(productSchema) });

    const onSubmit = (data: any) => {
        console.log(data);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Tittle
                                </Label>
                                <Input
                                    {...register("name")}
                                    id="name"
                                    placeholder="example"
                                    className={`col-span-3 ${inputClassName}`}
                                    type="text"
                                    defaultValue={productData?.name ?? ""}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    {...register("price", {
                                        setValueAs: (v) =>
                                            v === ""
                                                ? undefined
                                                : parseInt(v, 10),
                                    })}
                                    id="price"
                                    placeholder="1"
                                    type="number"
                                    min={0}
                                    className={`col-span-3 ${inputClassName}`}
                                    defaultValue={productData?.price ?? 1}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="quantity"
                                    className="text-right"
                                >
                                    Quantity
                                </Label>
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
                                    defaultValue={productData?.quantity ?? 1}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Description
                                </Label>
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
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Category
                                </Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
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
