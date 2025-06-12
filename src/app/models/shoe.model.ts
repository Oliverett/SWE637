export interface Shoe {
  id: string;
  name: string;
  price: number;
  size: number[];
  category: string;
  imageUrl: string;
  description: string;
  brand: string;
  color: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
}