// item.model.ts
export interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantityAvailable: number;
  quantityToCart?: number;
}
