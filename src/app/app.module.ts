import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsModule } from './items/items.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ShopReducer } from './store/reducers/shopReducer';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './store/effects/shopEffects';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartModule } from './cart/cart.module';
// import { ProductItemComponentModule } from './product-item/product-item.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // CartComponent,
    // ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ItemsModule,
    CartModule,
    // ProductItemComponentModule,
    HttpClientModule,
    StoreModule.forRoot({
      shopping: ShopReducer
    }),
    EffectsModule.forRoot([ShopEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
