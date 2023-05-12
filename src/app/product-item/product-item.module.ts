import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ProductItemComponentModule { }
