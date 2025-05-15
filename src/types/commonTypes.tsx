export const validCategories: string[] = [
    "fashion",
    "health",
    "electronics",
    "food",
    "travel",
    "sports",
    "accessories",
    "furniture",
    "home Appliances",
    "computers",
];

export type AddNewProductType = {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    isActive: boolean;
    image: string;
    date: Date;
};
export type UserLoginType = {
    email: string;
    name: string;
    password: string;
};
export type ProductType = {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    isActive: boolean;
    date: Date;
};

export type ProductCartType = {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    quantityInCart?: number;
};
