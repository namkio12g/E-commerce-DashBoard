import { create } from "zustand";
import { createProductSlice, ProductSlice } from "./ProductSlice";
import { createSelectors } from "./createSelectores";
import { persistCartSlice, CartSlice } from "./CartSlice";
import { createUserSlice, UserSlice } from "./UserSlice";

interface StoreState extends CartSlice, ProductSlice, UserSlice {}

const useBoundStoreBase = create<StoreState>((...a) => ({
    ...persistCartSlice(...a),
    ...createUserSlice(...a),
    ...createProductSlice(...a),
}));
export const useBoundStore = createSelectors(useBoundStoreBase);
