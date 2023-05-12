import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { ProductItemComponentModule } from '../product-item/product-item.module';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductItemComponentModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
