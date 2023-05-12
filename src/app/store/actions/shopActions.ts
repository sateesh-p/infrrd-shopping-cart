import { createAction, props } from '@ngrx/store';
import { ProductItem } from 'src/models/item.model';


export enum ActionTypes {
  UpdateCartItem = '[Shopping Cart] Update cart item',
  GetProductItems = '[Shopping Cart] Get product items from server',
  GetProductItemsSuccess = '[Shopping Cart] Get product items success'
}

export const getItems = createAction(ActionTypes.GetProductItems);
export const updateCartItem = createAction(ActionTypes.UpdateCartItem, props<{ payload: { item: ProductItem, quantity: number } }>());
export const getItemsSuccess = createAction(ActionTypes.GetProductItemsSuccess, props<{ payload: { products: ProductItem[] } }>());
