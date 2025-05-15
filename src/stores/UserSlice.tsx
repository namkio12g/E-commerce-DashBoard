import { StateCreator } from "zustand";
import { UserLoginType } from "@/types/commonTypes";

export interface UserSlice {
    UserInfo: UserLoginType | null;
    Login: (UserInfo: UserLoginType) => void;
    Logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
    UserInfo: null,
    Login: (UserInfo) => set(() => ({ UserInfo })),
    Logout: () => set(() => ({ UserInfo: null })),
});
