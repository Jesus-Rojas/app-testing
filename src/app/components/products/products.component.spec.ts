import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/products.service';
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
  });

  it('should create', () => {
    const productsMock = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); // ngOnInit

    expect(component).toBeTruthy();
    expect(productsService.getAll).toHaveBeenCalled();
  });
});
