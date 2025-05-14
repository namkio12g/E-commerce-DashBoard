import { StateCreator } from "zustand";
import { ProductType } from "@/types/commonTypes";

export interface ProductSlice {
    products: ProductType[];
    flagProductDialogOpen: "edit" | "add" | undefined;
    editProductData: ProductType | null;
    addProduct: (product: ProductType) => void;
    setProducts: (products: ProductType[]) => void;

    setEditProductDialogData: (product: ProductType) => void;
    setAddProductDialogData: () => void;
    closeProductDialog: () => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
    products: [],
    flagProductDialogOpen: undefined,
    editProductData: null,
    addProduct: (product: ProductType) => {
        set((state) => ({
            products: [...state.products, product],
        }));
    },
    setProducts: (products: ProductType[]) => {
        set(() => ({
            products: products,
        }));
    },
    setEditProductDialogData: (product: ProductType) => {
        set(() => ({
            flagProductDialogOpen: "edit",
            editProductData: product,
        }));
    },
    setAddProductDialogData: () => {
        set(() => ({
            flagProductDialogOpen: "add",
            editProductData: null,
        }));
    },
    closeProductDialog: () => {
        set(() => ({
            flagProductDialogOpen: undefined,
            editProductData: null,
        }));
    },
});
