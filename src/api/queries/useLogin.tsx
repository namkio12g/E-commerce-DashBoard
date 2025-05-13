import apiClient from "../TaskAPI";
import { UserLoginType } from "@/types/commonTypes";

export const loginQuery = async (
    email: string,
    password: string
): Promise<UserLoginType> => {
    return await apiClient.get(`/products?email=${email}&password=${password}`);
};
