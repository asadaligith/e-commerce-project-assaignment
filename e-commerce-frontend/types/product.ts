export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  phoneNumber: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}