import { StateCreator } from "zustand";
import { ProductType } from "@/types/commonTypes";

export interface ProductSlice {
    products: ProductType[];
    addProduct: (product: ProductType) => void;
    setProducts: (products: ProductType[]) => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
    products: [],
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
});
