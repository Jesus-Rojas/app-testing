import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HighligthDirective } from '../../directives/highligth.directive';
import { generateManyProducts } from '../../mocks/product.mock';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { ProductsService } from '../../products/services/products.service';
import { OthersComponent } from './others.component';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ OthersComponent, ReversePipe, HighligthDirective ],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    productsService.getAll.and.returnValue(of(generateManyProducts(10)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
