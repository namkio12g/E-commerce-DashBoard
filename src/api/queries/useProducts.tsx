import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../TaskAPI";
import { ProductType } from "@/types/commonTypes";

const fetchProducts = async (): Promise<ProductType[]> => {
    const res = await apiClient.get("/products");
    return res.data;
};
const addNewProduct = async (product: ProductType): Promise<ProductType> => {
    const res = await apiClient.post("/products", product);
    return res.data;
};
const editProduct = async (product: ProductType): Promise<ProductType> => {
    const res = await apiClient.put(`/products/${product.id}`, product);
    return res.data;
};
const deleteProduct = async (id: string): Promise<ProductType> => {
    const res = await apiClient.delete(`/products/${id}`);
    return res.data;
};

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 1,
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
