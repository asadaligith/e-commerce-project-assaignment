import axios from "axios";
import { Product } from "@/types/product";

interface ProductsResponse {
  products: Product[];
}

const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

export const getProducts = async (): Promise<
  Product[]
> => {
  try {
    const response =
      await api.get<ProductsResponse>(
        "/products"
      );

    return response.data.products || [];
  } catch (error) {
    console.error("Get Products Error:", error);

    return [];
  }
};

export const searchProducts = async (
  query: string
): Promise<Product[]> => {
  try {
    const response =
      await api.get<ProductsResponse>(
        `/products?q=${query}`
      );

    return response.data.products || [];
  } catch (error) {
    console.error("Search Error:", error);

    return [];
  }
};

export const getProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const response = await fetch(
      `https://e-commerce-project-assaignment-back.vercel.app/products/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("PRODUCT DATA:", data);

    return data;
  } catch (error) {
    console.error("Product Fetch Error:", error);

    return null;
  }
};