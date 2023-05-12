import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { ProductItemComponentModule } from '../product-item/product-item.module';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    CartComponent,
    CartSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductItemComponentModule
  ],
  exports: [
    CartComponent,
    ProductItemComponentModule
  ]
})
export class CartModule { }
