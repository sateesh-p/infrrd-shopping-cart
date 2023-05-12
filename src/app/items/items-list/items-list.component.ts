import { Component, ViewChild } from '@angular/core';
import { ProductItem } from '../../../models/item.model';
import { CartItem } from '../../../models/cart-item.model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AppState } from 'src/models/app-state.model';
import { getItems } from 'src/app/store/actions/shopActions';
import { ProductItemComponent } from 'src/app/product-item/product-item.component';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {
  items: Observable<ProductItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>

  cartItems: ProductItem[] = [];
  cart: CartItem[] = [];
  selectedItem: ProductItem | null = null;
  newItemName: string = '';
  newItemCategory: string = '';
  newItemQuantities: number[] = [];
  filterName: string = '';
  filterCategory: string = '';
  @ViewChild(ProductItemComponent) productItem:ProductItemComponent;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.items = this.store.select(store => store.shopping.items);
    this.items.subscribe((data) => {
      console.log(data)
    })
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.store.dispatch(getItems());
  }
  addToCart(item: ProductItem): void {
    const quantity = this.newItemQuantities[item.id - 1];
    if (quantity > 0 && item.quantityAvailable >= quantity) {
      const newItem: ProductItem = { ...item, quantityAvailable: quantity };
      this.cartItems.push(newItem);
    }
  }

  // editItem(item: ProductItem): void {
  //   this.selectedItem = item;
  //   this.newItemName = item.name;
  //   this.newItemCategory = item.category;
  //   this.newItemQuantities[item.id - 1] = item.quantityAvailable;
  // }

  // updateItem(): void {
  //   if (this.selectedItem) {
  //     this.selectedItem.name = this.newItemName;
  //     this.selectedItem.category = this.newItemCategory;
  //     this.selectedItem.quantityAvailable = this.newItemQuantities[this.selectedItem.id - 1];
  //     this.selectedItem = null;
  //   }
  // }

  deleteItem(item: ProductItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  resetForm(): void {
    // this.selectedItem = null;
    // this.newItemName = '';
    // this.newItemCategory = '';
    // this.newItemQuantities = this.items.map(item => item.quantityAvailable);
  }

  // sortItemsAlphabetically(): void {
  //   this.items.subscribe((data) => {
  //     const sortedItems = data.slice().sort((a, b) => a.name.localeCompare(b.name));
  //     this.items = from([sortedItems]);
  //   });
  // }
  toggleSort(event:any): void {
    if (event.target.checked) {
      this.items.subscribe((data) => {
        const sortedItems = data.slice().sort((a, b) => a.name.localeCompare(b.name));
        this.items = from([sortedItems]);
      });
    } else {
      this.items = this.store.select(store => store.shopping.items);
    }
  }

  filterItemsByName(event: any): void {
    const filterValue = event.target.value.trim().toLowerCase();
    this.items = this.store.select(store => store.shopping.items)
      .pipe(
        map(items => {
          if (filterValue) {
            return items.filter(item => item.name.toLowerCase().includes(filterValue));
          } else {
            return items;
          }
        })
      );
  }
  

  filterItemsByCategory(event: any): void {
    const filterValue = event.target.value.trim().toLowerCase();
    this.items = this.store.select(store => store.shopping.items)
      .pipe(
        map(items => {
          if (filterValue) {
            return items.filter(item => item.category.toLowerCase().includes(filterValue));
          } else {
            return items;
          }
        })
      );
  }
  openProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
  
}

