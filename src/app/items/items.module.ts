import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ProductItemComponentModule } from '../product-item/product-item.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ItemsListComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ProductItemComponentModule,    
  ],
  exports: [
    ItemsListComponent
  ]
})
export class ItemsModule { }
