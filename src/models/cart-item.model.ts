import { ProductItem } from "./item.model";

export interface CartItem {
  item: ProductItem;
  quantity: number;
  totalAmount: number;
}
