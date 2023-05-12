import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsService } from './items.service';
import { ProductItem } from '../../models/item.model';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService]
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all items', () => {
    const items: ProductItem[] = [
      // Define your mock items
    ];

    service.getAllItems().subscribe((response) => {
      expect(response).toEqual(items);
    });

    const req = httpMock.expectOne('assets/mock_data/productItems.json');
    expect(req.request.method).toBe('GET');
    req.flush(items);
  });

  it('should add item to cart', () => {
    const item: ProductItem = {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "category": "Electronics",
      "quantityAvailable": 5,
      "price": 20,
      "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
      "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
    };
    const quantity = 1;

    service.addToCart(item, quantity);

    expect(item.quantityAvailable).toBe(4);
  });

  it('should edit cart item', () => {
    const item: ProductItem = {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "category": "Electronics",
      "quantityAvailable": 5,
      "price": 20,
      "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
      "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
    };
    const quantity = 2;
    service.addToCart(item, quantity);
    service.editCartItem(item, quantity);

    expect(item.quantityAvailable).toBe(1);
  });

  it('should delete cart item', () => {
    const item: ProductItem = {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "category": "Electronics",
      "quantityAvailable": 5,
      "price": 20,
      "description": "The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy.",
      "image": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g990elvginu/gallery/in-galaxy-s21-fe-g990-sm-g990elvginu-thumb-530606516?imwidth=480"
    };
    item.quantityAvailable = 2;
    service.addToCart(item, 2);

    service.deleteCartItem(item);

    expect(service.getCartItems()).not.toContain(item);
    expect(item.quantityAvailable).toBe(0);
  });
});
