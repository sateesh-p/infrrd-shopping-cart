import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ProductItemComponentModule } from '../product-item/product-item.module';


@NgModule({
  declarations: [
    ItemsListComponent,
    FilterPipe,
    // ProductItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductItemComponentModule
  ],
  exports: [
    ItemsListComponent
  ]
})
export class ItemsModule { }
