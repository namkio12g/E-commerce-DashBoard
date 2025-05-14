import { StateCreator } from "zustand";
import { ProductCartType } from "@/types/commonTypes";
import { persist } from "zustand/middleware";

export interface CartSlice {
    productsInCart: ProductCartType[];
    addProductToCart: (product: ProductCartType) => void;
    setProductQuantityInCart: (value: number, productId: string) => void;
    removeProductFromCart: (productId: string) => void;
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
        set((state) => {
            if (state.productsInCart.find((item) => item.id === product.id)) {
                return { productsInCart: state.productsInCart };
            }
            return {
                productsInCart: [
                    ...state.productsInCart,
                    { ...product, quantityInCart: 1 },
                ],
            };
        });
    },
    setProductQuantityInCart: (value: number, productId: string) => {
        set((state) => ({
            productsInCart: state.productsInCart.map((item) => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantityInCart: value,
                    };
                }
                return item;
            }),
        }));
    },
    removeProductFromCart: (productId: string) => {
        set((state) => ({
            productsInCart: state.productsInCart.filter(
                (item) => item.id !== productId
            ),
        }));
    },
});
export const persistCartSlice = persist(createCartSlice, {
    name: "cart-store",
    partialize: (state) => ({
        productsInCart: state.productsInCart,
    }),
});
