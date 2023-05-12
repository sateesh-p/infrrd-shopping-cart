import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent} from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  
  exports: [
    ProductItemComponent,
    ProductDetailsComponent
  ]
})
export class ProductItemComponentModule { }
