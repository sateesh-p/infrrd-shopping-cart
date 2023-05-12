import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { getSelectedItem, updateCartItem } from '../../store/actions/shopActions';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';
import { ProductItem } from '../../../models/item.model';
import { ActivatedRoute } from '@angular/router';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let store: MockStore;
  const initialState: AppState = {
    shopping: {
      selectedItem: {} as ProductItem,
      loading: false,
      cart: [],
      items: []
    },
  };
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '1', // Mocking the route parameter value
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      declarations: [ProductDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getSelectedItem action on component initialization', () => {
    const spy = spyOn(store, 'dispatch');
    const action = getSelectedItem({ payload: { id: 1 } });
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should display an alert when addToCart is called and quantity exceeds quantityAvailable', () => {
    spyOn(window, 'alert');
    component.product = {
        "id": 1,
        "name": "iPhone 12 Pro",
        "category": "Electronics",
        "quantityAvailable": 10,
        "price": 20,
        "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
        "specifications":"146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",  
        "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
    };
    component.quantity = 11;
    component.addToCart();
    expect(window.alert).toHaveBeenCalledWith('Sorry! Only 10 items available');
  });

  it('should dispatch updateCartItem action when removeFromCart is called', () => {
    const spy = spyOn(store, 'dispatch');
    const action = updateCartItem({ payload: { item: component.product, quantity: -1 } });
    component.removeFromCart();
    expect(spy).toHaveBeenCalledWith(action);
  });
  it('should dispatch updateCartItem action when addToCart is called', () => {
    component.product = {
      "id": 1,
      "name": "iPhone 12 Pro",
      "category": "Electronics",
      "quantityAvailable": 10,
      "price": 20,
      "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
      "specifications":"146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",  
      "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
  };
    const spy = spyOn(store, 'dispatch');
    const action = updateCartItem({ payload: { item: component.product, quantity: 1 } });
    component.addToCart();
    expect(spy).toHaveBeenCalledWith(action);
  });
});
