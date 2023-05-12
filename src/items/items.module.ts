import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';


@NgModule({
  declarations: [
    ItemsListComponent,    
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    ItemsListComponent
  ]
})
export class ItemsModule { }
