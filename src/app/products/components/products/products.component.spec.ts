import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { generateManyProducts } from 'src/app/mocks/product.mock';

import { ValueService } from 'src/app/services/value.service';
import { Status } from 'src/app/types/status.enum';
import {
  clickEventById,
  getTextById,
  observableError,
  observableSuccess,
  promiseSuccess
} from 'src/testing';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

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
        {
          provide: ValueService,
          useValue: valueServiceSpy
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

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
      productsService.getAll.and.returnValue(observableSuccess(productsMock));
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
      productsService.getAll.and.returnValue(observableError());
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual(Status.Loading);
      tick(4000); // exec, obs, setTimeout, promise
      // Assert
      expect(component.status).toEqual(Status.Error);
    }));
  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMessage = 'mock string';
      valueService.getPromiseValue.and.returnValue(promiseSuccess(mockMessage));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "mock string" in <p> when btn was clicked', fakeAsync(() => {
      // Arrange
      const mockMessage = 'mock string';
      valueService.getPromiseValue.and.returnValue(promiseSuccess(mockMessage));
      // Act
      clickEventById(fixture, 'btn-promise');
      tick();
      fixture.detectChanges();

      // Assert
      expect(getTextById(fixture, 'p-rta')).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));
  });
});
