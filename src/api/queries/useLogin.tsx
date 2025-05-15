import apiClient from "../TaskAPI";
import { UserLoginType } from "@/types/commonTypes";

export const loginQuery = async (
    email: string,
    password: string
): Promise<UserLoginType> => {
    const res = await apiClient.get(
        `/users?email=${email}&password=${password}`
    );
    return res.data[0];
};
