import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ProductItemComponent } from './product-item.component';
import { AppState } from 'src/models/app-state.model';
import { CartItem } from 'src/models/cart-item.model';
import { updateCartItem } from '../store/actions/shopActions';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [StoreModule.forRoot({})], // Add any required modules for the test
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quantity and subscribe to cartItems', () => {
    component.product = {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "category": "Electronics",
      "quantityAvailable": 5,
      "price": 20,
      "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
      "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
    }
    // Mock cartItems data
    const cartItems: CartItem[] = 
      [{item:{
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
    spyOn(store, 'select').and.returnValue(of(cartItems));

    component.ngOnInit();

    expect(component.quantity).toBe(3);
  });

  it('should dispatch updateCartItem action when addToCart is called', () => {
    spyOn(store, 'dispatch');

    component.quantity = 0;
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
    component.addToCart(new Event('click'));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateCartItem({ payload: { item: component.product, quantity: 1 } })
    );
  });

  it('should not dispatch updateCartItem action when addToCart is called with quantity exceeding quantityAvailable', () => {
    spyOn(store, 'dispatch');

    component.quantity = 5;
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
    component.quantity =11;
    component.addToCart(new Event('click'));

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch updateCartItem action when removeFromCart is called', () => {
    spyOn(store, 'dispatch');

    component.quantity = 2;
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
    component.removeFromCart(new Event('click'));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateCartItem({ payload: { item: component.product, quantity: 1 } })
    );
  });

  it('should dispatch updateCartItem action when deleteItemFromCart is called', () => {
    spyOn(store, 'dispatch');

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
    component.deleteItemFromCart(new Event('click'));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateCartItem({ payload: { item: component.product, quantity: 0 } })
    );
  });
});
