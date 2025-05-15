import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../TaskAPI";
import { AddNewProductType, ProductType } from "@/types/commonTypes";

export const fetchProducts = async (query: string): Promise<ProductType[]> => {
    console.log(query);
    const res = await apiClient.get(`/products?isDelete=false&${query}`);
    return res.data;
};
const addNewProduct = async (
    product: AddNewProductType
): Promise<ProductType> => {
    const res = await apiClient.post("/products", product);
    return res.data;
};
const editProduct = async (product: ProductType): Promise<ProductType> => {
    const res = await apiClient.put(`/products/${product.id}`, product);
    return res.data;
};
const deleteProduct = async (id: string): Promise<ProductType> => {
    const res = await apiClient.patch(`/products/${id}`, { isDelete: true });
    return res.data;
};

export const useProducts = (query: string = "") => {
    return useQuery({
        queryKey: ["products", query],
        queryFn: () => fetchProducts(query),
        staleTime: 1000 * 30,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
};

export const useAddProduct = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: addNewProduct,
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["products'"] });
        },
        onError: () => {
            alert("Error adding product");
        },
    });
};
export const useEditProduct = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: editProduct,
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["products'"] });
        },
        onError: () => {
            alert("Error adding product");
        },
    });
};
export const useDeleteProduct = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["products'"] });
        },
        onError: () => {
            alert("Error adding product");
        },
    });
};
