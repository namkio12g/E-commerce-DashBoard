import { StateCreator } from "zustand";
import { ProductCartType } from "@/types/commonTypes";
import { persist } from "zustand/middleware";

export interface CartSlice {
    productsInCart: ProductCartType[];
    addProductToCart: (product: ProductCartType) => void;
    isCartOpen: boolean;
    toggleCart: (value: boolean) => void;
}

const createCartSlice: StateCreator<CartSlice> = (set) => ({
    productsInCart: [],
    isCartOpen: false,
    toggleCart: (value: boolean) => {
        set(() => ({
            isCartOpen: value,
        }));
    },
    addProductToCart: (product: ProductCartType) => {
        set((state) => ({
            productsInCart: [...state.productsInCart, product],
        }));
    },
});
export const persistCartSlice = persist(createCartSlice, {
    name: "cart-store",
});
