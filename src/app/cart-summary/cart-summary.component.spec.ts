import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ProductItem } from 'src/models/item.model';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let storeMock: Store<AppState>;

  const initialState: AppState = {
    shopping: {
      selectedItem: {} as ProductItem,
      loading: false,
      cart: [],
      items: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartSummaryComponent],
      imports: [
        StoreModule.forRoot()
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update totalAmount when cartItems change', () => {
    const cartItems: CartItem[] = [
      {item:{
        "id": 2,
        "name": "Samsung Galaxy S21",
        "category": "Electronics",
        "quantityAvailable": 5,
        "price": 20,
        "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
        "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
      },quantity:3,totalAmount:60}, {item:{
        "id": 1,
        "name": "iPhone 12 Pro",
        "category": "Electronics",
        "quantityAvailable": 10,
        "price": 20,
        "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
        "specifications":"146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",
        "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
      },quantity:3,totalAmount:60}
    ];
    const store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(cartItems));

    fixture.detectChanges();

    expect(component.totalAmount).toEqual(120);
  });
});
