import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ItemsService } from 'src/app/items/items.service';
import { ActionTypes } from '../actions/shopActions';

@Injectable()
export class ShopEffects {

  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.GetProductItems),
      exhaustMap(() => this.itemsService.getAllItems().pipe(
        map(items => {
          return { type: ActionTypes.GetProductItemsSuccess, payload: { products: items } };
        }),
        catchError(() => EMPTY)
      )
      )
    )
  });



  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) { }
}
