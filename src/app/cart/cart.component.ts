import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: Observable<CartItem[]>;
  constructor(private store: Store<AppState>, private router: Router) { }
  ngOnInit(): void {
    this.cartItems = this.store.select(store => store.shopping.cart);
  }
  /*Function to redirect to homepage */
  goToHomePage() {
    this.router.navigate(['/'])
  }
}
