export const validCategories: string[] = [
    "Fashion",
    "Health",
    "Electronics",
    "Food",
    "Travel",
    "Sports",
];

export type AddNewProductType = {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    isActive: boolean;
    date: Date;
};
export type ProductType = {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    isActive: boolean;
    date: Date;
};
