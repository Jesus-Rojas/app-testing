import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { generateOneProduct } from 'src/app/mocks/product.mock';
import { ActivatedRouteStub, getText, getTextById, query } from 'src/testing';
import { ProductsService } from '../../services/products.service';
import { ProductDetailComponent } from './product-detail.component';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let activatedRoute: ActivatedRouteStub;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getOne']);
    const activatedRouteStub = new ActivatedRouteStub();
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
        {
          provide: Location,
          useValue: locationSpy,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    const productId = '1';
    activatedRoute.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productsService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show product in the view', () => {
    const productId = '2';
    activatedRoute.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productsService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();
    expect(getTextById(fixture, 'title')).toContain(productMock.title);
    expect(getTextById(fixture, 'price')).toContain(productMock.price);
    expect(productsService.getOne).toHaveBeenCalledWith(productId);
  });
});
