import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';
import { ProductItem } from 'src/models/item.model';
import { updateCartItem } from '../store/actions/shopActions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  constructor(private store: Store<AppState>) { }

  quantity = 0;
  @Input() product: ProductItem;
  cartItems: Observable<CartItem[]>;

  ngOnInit(): void {
    this.cartItems = this.store.select(store => store.shopping.cart);
    this.cartItems.subscribe((data) => {
      const item = data.find(x => x.item.id === this.product.id)
      this.quantity = item?.quantity || 0;
    })

  }

  addToCart() {
    this.store.dispatch(updateCartItem({ payload: { item: this.product, quantity: this.quantity + 1 } }));
  }

  removeFromCart() {
    this.store.dispatch(updateCartItem({ payload: { item: this.product, quantity: this.quantity - 1 } }));
  }

  doSomething() {
    
  }

}