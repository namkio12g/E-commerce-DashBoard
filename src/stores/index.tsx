import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createProductSlice, ProductSlice } from "./ProductSlice";
import { createSelectors } from "./createSelectores";
import { createCartSlice, CartSlice } from "./CartSlice";
import { createUserSlice, UserSlice } from "./UserSlice";

type StoreState = CartSlice & UserSlice & ProductSlice;

export const useBoundStoreBase = create<StoreState>()(
    persist(
        (...a) => ({
            ...createCartSlice(...a),
            ...createUserSlice(...a),
            ...createProductSlice(...a),
        }),
        {
            name: "app-store",
            partialize: (state) => ({
                UserInfo: state.UserInfo,
                productsInCart: state.productsInCart,
            }),
        }
    )
);

// Hook accessors
export const useBoundStore = createSelectors(useBoundStoreBase);
