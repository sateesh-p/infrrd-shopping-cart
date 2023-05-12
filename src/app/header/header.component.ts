import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItems: Observable<CartItem[]>;
  cartItemsCount = 0;
  constructor(private store: Store<AppState>, private router: Router) {
  }
  ngOnInit(): void {
    this.cartItems = this.store.select(store => store.shopping.cart);
    this.cartItems.subscribe((data) => {
      let count = 0;
      data.forEach(item => {
        count = count + item.quantity;
      })
      this.cartItemsCount = count;
    })
  }
  /*Function to Navigate to cart */
  onNavigateCart() {
    this.router.navigate(['/cart'])
  }
  /*Function to Navigate to home */
  onNavigateHome() {
    this.router.navigate(['/'])
  }
}
