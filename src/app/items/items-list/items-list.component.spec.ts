import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ItemsListComponent } from './items-list.component';
import { AppState } from 'src/models/app-state.model';
import { getItems } from 'src/app/store/actions/shopActions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItem } from 'src/models/item.model';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let storeMock: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgSelectModule,
        StoreModule.forRoot({}),
        FormsModule, ReactiveFormsModule
      ],
      declarations: [ItemsListComponent],
      providers: [Store]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    storeMock = TestBed.inject(Store);
    spyOn(storeMock, 'select').and.returnValue(of([]));
    spyOn(storeMock, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getItems action on ngOnInit', () => {
    component.ngOnInit();
    expect(storeMock.dispatch).toHaveBeenCalledWith(getItems());
  });

  it('should add item to cart on addToCart', () => {
    const item = {
      "id": 1,
      "name": "iPhone 12 Pro",
      "category": "Electronics",
      "quantityAvailable": 10,
      "price": 20,
      "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
      "specifications": "146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",
      "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
    };
    component.newItemQuantities[item.id - 1] = 5;

    component.addToCart(item);
    const addedItem = component.cartItems.find(cartItem => cartItem.id === item.id);
    expect(addedItem).toBeDefined();
    expect(addedItem?.name).toEqual(item.name);
    expect(addedItem?.category).toEqual(item.category);
  });

  it('should delete item from cart on deleteItem', () => {
    const item = {
      "id": 1,
      "name": "iPhone 12 Pro",
      "category": "Electronics",
      "quantityAvailable": 10,
      "price": 20,
      "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
      "specifications": "146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",
      "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
    };
    component.cartItems = [item];

    component.deleteItem(item);

    expect(component.cartItems).not.toContain(item);
  });

  it('should toggle sort and update items list', () => {
    const items = [
      {
        "id": 2,
        "name": "Samsung Galaxy S21",
        "category": "Electronics",
        "quantityAvailable": 5,
        "price": 20,
        "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
        "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
      }, {
        "id": 1,
        "name": "iPhone 12 Pro",
        "category": "Electronics",
        "quantityAvailable": 10,
        "price": 20,
        "description": "The iPhone 12 Pro and iPhone 12 Pro Max are smartphones designed, developed, and marketed by Apple Inc.",
        "specifications": "146.7 x 71.5 x 7.4 mm, 6.1 inches, 90.2 cm2, iOS 14.1, upgradable to iOS 16.4.1, 128GB 6GB RAM",
        "image": "https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1_.jpg"
      }
    ];

    // Set the initial items in the component
    component.items = of(items);

    // Toggle the sort
    const event = { target: { checked: true } };
    component.toggleSort(event);

    // Subscribe to the sorted items and check if they are in the reverse order of the initial items
    component.items.subscribe((sortedItems) => {
      expect(sortedItems).toEqual(items.slice().reverse());
    });

    // Toggle the sort off
    event.target.checked = false;
    component.toggleSort(event);

    // Subscribe to the items and check if they are the same as the initial items
    component.items.subscribe((items) => {
      expect(items).toEqual(items);

    });
  });

  it('should navigate to product details on openProductDetails', () => {
    const productId = 1;
    const routerSpy = spyOn(component.router, 'navigate');

    component.openProductDetails(productId);

    expect(routerSpy).toHaveBeenCalledWith(['/products', productId]);
  });
});
