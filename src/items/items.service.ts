// item.service.ts
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [
    { id: 1, name: 'Item 1', category: 'Category 1', quantityAvailable: 10 },
    { id: 2, name: 'Item 2', category: 'Category 2', quantityAvailable: 5 },
    // Add more predefined items here
  ];

  private cart: Item[] = [];

  getPredefinedItems(): Item[] {
    return this.items;
  }

  addToCart(item: Item, quantity: number): void {
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

  editCartItem(item: Item, quantity: number): void {
    const existingItem = this.cart.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantityAvailable += quantity;
      item.quantityAvailable -= quantity;
    }
  }

  deleteCartItem(item: Item): void {
    const index = this.cart.findIndex(i => i.id === item.id);

    if (index !== -1) {
      const deletedItem = this.cart.splice(index, 1)[0];
      deletedItem.quantityAvailable += item.quantityAvailable;
    }
  }

  sortItemsAlphabetically(): void {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterItemsByName(name: string): Item[] {
    return this.items.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  }

  filterItemsByCategory(category: string): Item[] {
    return this.items.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
  }

  getCartItems(): Item[] {
    return this.cart;
  }
}
