import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ProductDetailsComponent } from './product-item/product-details/product-details.component';

const routes: Routes = [
  { path: 'home', component: ItemsListComponent },
  { path: 'cart', component: CartComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
