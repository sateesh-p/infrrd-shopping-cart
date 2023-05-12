// item.service.ts
import { Injectable } from '@angular/core';
import { ProductItem } from '../../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient) {

  }
  private items: ProductItem[] = [

  ];

  private cart: ProductItem[] = [];

  getAllItems() {
    const url: string = 'src/assets/mock_data/productItems.json';
    return this.http.get(url)
  }
/*Function to add items from cart */
  addToCart(item: ProductItem, quantity: number): void {
    const existingItem = this.cart.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantityAvailable += quantity;
    } else {
      const itemCopy = { ...item };
      itemCopy.quantityAvailable = quantity;
      this.cart.push(itemCopy);
    }

    item.quantityAvailable -= quantity;
  }
/*Function to edit items in cart */
  editCartItem(item: ProductItem, quantity: number): void {
    const existingItem = this.cart.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantityAvailable += quantity;
      item.quantityAvailable -= quantity;
    }
  }
/*Function to delete items from cart */
  deleteCartItem(item: ProductItem): void {
    const index = this.cart.findIndex(i => i.id === item.id);

    if (index !== -1) {
      const deletedItem = this.cart.splice(index, 1)[0];
      deletedItem.quantityAvailable += item.quantityAvailable;
    }
  }

  getCartItems(): ProductItem[] {
    return this.cart;
  }
}
