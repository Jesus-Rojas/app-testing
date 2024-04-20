import { ComponentFixture, TestBed } from '@angular/core/testing';

import { generateOneProduct } from '../../../mocks/product.mock';
import { RouterLinkDirectiveStub } from '../../../../testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent, RouterLinkDirectiveStub ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = generateOneProduct();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
