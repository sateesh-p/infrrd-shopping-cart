import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/models/cart-item.model';
import { ProductItem } from 'src/models/item.model';
import { getItems, updateCartItem, getItemsSuccess } from '../actions/shopActions';

export interface ShoppingState {
  items: ProductItem[],
  cart: CartItem[],
  loading: boolean,
}

export const initialState: ShoppingState = {
  items: [],
  cart: [],
  loading: false
};

export const ShopReducer = createReducer(
  initialState,
  on(getItems, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getItemsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      items: action.payload.products
    }
  }),
  on(updateCartItem, (state, action) => {
    const cartItems = [...state.cart];
    const cartItem: CartItem = {
      item: action.payload.item,
      quantity: action.payload.quantity,
      totalAmount: action.payload.item.price * action.payload.quantity
    }

    const index = cartItems.findIndex(x => x.item.id === action.payload.item.id);
    if (index >= 0) {
      cartItems[index] = cartItem;
    } else {
      cartItems.push(cartItem)
    }

    return {
      ...state,
      loading: false,
      cart: [...cartItems]
    }
  }),
);

