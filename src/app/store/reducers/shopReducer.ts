import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/models/cart-item.model';
import { ProductItem } from 'src/models/item.model';
import { getItems, updateCartItem, getItemsSuccess, getSelectedItem, deleteCartItem } from '../actions/shopActions';

export interface ShoppingState {
  items: ProductItem[],
  cart: CartItem[],
  loading: boolean,
  selectedItem: ProductItem
}

export const initialState: ShoppingState = {
  items: [],
  cart: [],
  loading: false,
  selectedItem: {} as ProductItem
};

export const ShopReducer = createReducer(
  initialState,
  on(getItems, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(getSelectedItem, (state, action) => {
    const index = state.items.findIndex(x => x.id === action.payload.id);
    const selectedItem = { ...state.items[index] };
    return {
      ...state,
      loading: true,
      selectedItem
    };
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

    if (action.payload.quantity > 0) {
      const index = cartItems.findIndex(x => x.item.id === action.payload.item.id);
      if (index >= 0) {
        cartItems[index] = cartItem;
      } else {
        cartItems.push(cartItem)
      }
    } else {
      const index = cartItems.findIndex(x => x.item.id === action.payload.item.id);
      if (index >= 0) {
        cartItems.splice(index, 1)
      }
    }

    return {
      ...state,
      loading: false,
      cart: [...cartItems]
    }
  }),

  on(deleteCartItem, (state, action) => {
    const cartItems = [...state.cart];

    const index = cartItems.findIndex(x => x.item.id === action.payload.item.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }

    return {
      ...state,
      loading: false,
      cart: [...cartItems]
    }
  }),
);

