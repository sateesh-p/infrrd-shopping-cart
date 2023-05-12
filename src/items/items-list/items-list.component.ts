import { Component } from '@angular/core';
import { Item } from '../../models/item.model';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {
  items: Item[] = [
    { id: 1, name: 'iPhone 12 Pro', category: 'Electronics', quantityAvailable: 10 },
    { id: 2, name: 'Samsung Galaxy S21', category: 'Electronics', quantityAvailable: 5 },
    { id: 3, name: 'Sony PlayStation 5', category: 'Gaming', quantityAvailable: 8 },
    { id: 4, name: 'Xbox Series X', category: 'Gaming', quantityAvailable: 3 },
    { id: 5, name: 'Nike Air Max 90', category: 'Fashion', quantityAvailable: 12 },
    { id: 6, name: 'Adidas Stan Smith', category: 'Fashion', quantityAvailable: 6 },
    { id: 7, name: 'Apple AirPods Pro', category: 'Electronics', quantityAvailable: 15 },
    { id: 8, name: 'Dell XPS 13', category: 'Electronics', quantityAvailable: 9 },
    { id: 9, name: 'HP Pavilion 15', category: 'Electronics', quantityAvailable: 7 },
    { id: 10, name: 'Sony WH-1000XM4', category: 'Electronics', quantityAvailable: 11 },
    { id: 11, name: 'Logitech G502', category: 'Gaming', quantityAvailable: 4 },
    { id: 12, name: 'Razer BlackWidow Elite', category: 'Gaming', quantityAvailable: 6 },
    { id: 13, name: 'Levis 501 Jeans', category: 'Fashion', quantityAvailable: 8 },
    { id: 14, name: 'Ray-Ban Wayfarer Sunglasses', category: 'Fashion', quantityAvailable: 7 },
    { id: 15, name: 'Canon EOS Rebel T7i', category: 'Electronics', quantityAvailable: 9 },
    { id: 16, name: 'Nintendo Switch', category: 'Gaming', quantityAvailable: 10 },
    { id: 17, name: 'Vans Old Skool', category: 'Fashion', quantityAvailable: 3 },
    { id: 18, name: 'Apple Watch Series 6', category: 'Electronics', quantityAvailable: 5 },
    { id: 19, name: 'GoPro Hero 9', category: 'Electronics', quantityAvailable: 12 },
    { id: 20, name: 'Bose QuietComfort 35 II', category: 'Electronics', quantityAvailable: 8 }
  ];

  cartItems: Item[] = [];
  cart: CartItem[] = [];
  selectedItem: Item | null = null;
  newItemName: string = '';
  newItemCategory: string = '';
  newItemQuantities: number[] = [];
  filterName: string = '';
  filterCategory: string = '';

  ngOnInit(): void {
    this.items.forEach(item => {
      this.newItemQuantities.push(item.quantityAvailable);
    });
  }
  addToCart(item: Item): void {
    const quantity = this.newItemQuantities[item.id - 1];
    if (quantity > 0 && item.quantityAvailable >= quantity) {
      const newItem: Item = { ...item, quantityAvailable: quantity };
      this.cartItems.push(newItem);
    }
  }

  editItem(item: Item): void {
    this.selectedItem = item;
    this.newItemName = item.name;
    this.newItemCategory = item.category;
    this.newItemQuantities[item.id - 1] = item.quantityAvailable;
  }

  updateItem(): void {
    if (this.selectedItem) {
      this.selectedItem.name = this.newItemName;
      this.selectedItem.category = this.newItemCategory;
      this.selectedItem.quantityAvailable = this.newItemQuantities[this.selectedItem.id - 1];
      this.selectedItem = null;
    }
  }

  deleteItem(item: Item): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  resetForm(): void {
    this.selectedItem = null;
    this.newItemName = '';
    this.newItemCategory = '';
    this.newItemQuantities = this.items.map(item => item.quantityAvailable);
  }

  sortItemsAlphabetically(): void {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterItemsByName(event:any): void {
    let name = event.target.value;
    // Assuming the search term is case-insensitive
    const searchTerm = name.toLowerCase().trim();
    this.items = this.items.filter(item => item.name.toLowerCase().includes(searchTerm));
  }

  filterItemsByCategory(event:any): void {
    // Assuming the search term is case-insensitive
    let category = event.target.value;
    const searchTerm = category.toLowerCase().trim();
    this.items = this.items.filter(item => item.category.toLowerCase().includes(searchTerm));
  }
}
