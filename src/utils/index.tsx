import { validCategories } from "@/types/commonTypes";

export const H1ClassName = "text-3xl font-bold font-roboto";
export const H2ClassName = "text-2xl font-bold font-roboto";
export const H3ClassName = "text-xl font-bold font-roboto";
export const H4ClassName = "text-lg font-bold font-roboto";
export const SmallTextClassName = "text-sm font-roboto text-gray-500";
export const ClickCommonClassName =
    "cursor-pointer text-foreground hover:bg-theme-primary hover:text-white  ";

export const isValidCategory = (category: string): boolean => {
    return validCategories.includes(category);
};
