import { StateCreator } from "zustand";
import { ProductType } from "@/types/commonTypes";

export interface ProductSlice {
    products: ProductType[];
    flagProductDialogOpen: "edit" | "add" | undefined;
    editProductData: ProductType | null;
    addProduct: (product: ProductType) => void;
    updateProduct: (product: ProductType) => void;
    deleteProduct: (productId: string) => void;
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
    updateProduct: (product: ProductType) => {
        set((state) => ({
            products: state.products.map((p) =>
                p.id === product.id ? product : p
            ),
        }));
    },
    deleteProduct: (productId: string) => {
        set((state) => ({
            products: state.products.filter((p) => p.id !== productId),
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
