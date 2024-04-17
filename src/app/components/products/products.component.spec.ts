import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, defer } from 'rxjs';

import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/products.service';
import { Status } from 'src/app/types/status.enum';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductComponent,
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;

    const productsMock = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productsService.getAll).toHaveBeenCalled();
  });

  describe('tests for getAllProducts', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productsService.getAll.and.returnValue(of(productsMock));
      const countPrevProducts = component.products.length;
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(countPrevProducts + productsMock.length);
    });

    it(`should change the status "${Status.Loading}" => "${Status.Success}"`, fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productsService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual(Status.Loading);
      tick(); // exec, obs, setTimeout, promise
      // Assert
      expect(component.status).toEqual(Status.Success);
    }));

    it(`should change the status "${Status.Loading}" => "${Status.Error}"`, fakeAsync(() => {
      // Arrange
      productsService.getAll.and.returnValue(defer(() => Promise.reject()));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual(Status.Loading);
      tick(4000); // exec, obs, setTimeout, promise
      // Assert
      expect(component.status).toEqual(Status.Error);
    }));
  });
});
