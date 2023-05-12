import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  cartItems: Observable<CartItem[]>;
  totalAmount = 0;
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.cartItems = this.store.select(store => store.shopping.cart);
    this.cartItems.subscribe((data) => {
      let totalAmount = 0;
      data.forEach(item => {
        totalAmount = totalAmount + item.totalAmount;
      })
      this.totalAmount = totalAmount;
    })
  }
}
