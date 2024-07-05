import { Product, ProductRequest } from "../../../../domain/entities";
import { product } from "../models/productSchema";

export const addProduct = async (data: ProductRequest): Promise<Product | null> => {
    try {
        const newProduct = new product(data);
        const savedProduct = await newProduct.save();
        console.log("🚀 ~ file: addProduct.ts:8 ~ addProduct ~ savedProduct:", savedProduct)
        return savedProduct as Product;
    } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Failed to add product.");
    }
};
