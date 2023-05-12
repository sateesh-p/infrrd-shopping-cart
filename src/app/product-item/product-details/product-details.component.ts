import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ProductItem } from '../../../models/item.model';
import { AppState } from 'src/models/app-state.model';
import { ActivatedRoute } from '@angular/router';
import { getSelectedItem, updateCartItem } from './../../store/actions/shopActions';
import { CartItem } from 'src/models/cart-item.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  selectedItem: Observable<ProductItem>;
  loading$: Observable<Boolean>;
  product: ProductItem;
  cartItems: Observable<CartItem[]>;
  quantity = 0;

  constructor(private store: Store<AppState>,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.selectedItem = this.store.select(store => store.shopping.selectedItem);
    this.selectedItem.subscribe((data) => {
      this.product = data;
    })
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.store.dispatch(getSelectedItem({ payload: { id: Number(id)} }));

    this.cartItems = this.store.select(store => store.shopping.cart);
    this.cartItems.subscribe((data) => {
      const item = data.find(x => x.item.id === this.product.id)
      this.quantity = item?.quantity || 0;
    })
  }
/*Function to add items to cart */
  addToCart() {
    if (this.quantity + 1 <= this.product.quantityAvailable) {
      this.store.dispatch(updateCartItem({ payload: { item: this.product, quantity: this.quantity + 1 } }));
    }  
    else{
      alert("Sorry! Only "+this.product.quantityAvailable+" items available");
    }
  }
/*Function to remove items from cart */
  removeFromCart() {
    this.store.dispatch(updateCartItem({ payload: { item: this.product, quantity: this.quantity - 1 } }));
  }
}
