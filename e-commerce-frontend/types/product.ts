export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  category: string;
  brand?: string;
  rating?: number;
  stock?: number;
}