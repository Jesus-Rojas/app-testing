import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { clickElementById, getTextById, observableSuccess, query, queryAllByDirective } from "src/testing";
import { AppComponent } from "./app.component";
import { routes } from "./app-routing.module";
import { AppModule } from "./app.module";
import { ProductsService } from "./products/services/products.service";
import { of } from "rxjs";
import { generateManyProducts } from "./mocks/product.mock";

fdescribe('App Integration Test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(fakeAsync(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // providers
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick();
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const elements = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(elements.length).toEqual(7);
  });

  it('should render OthersComponent when clicked', fakeAsync(() => {
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(observableSuccess(productsMock));
    
    clickElementById(fixture, 'others-link');
    tick(); // wait while nav ...
    fixture.detectChanges();
    tick(); // exec productsService.getAll()
    fixture.detectChanges(); // update html

    expect(router.url).toEqual('/others');
    expect(query(fixture, 'app-others')).not.toBeNull();
    expect(getTextById(fixture, 'products-length')).toContain(productsMock.length);
  }));

  it('should render PicoPreviewComponent when clicked', fakeAsync(() => {
    clickElementById(fixture, 'pico-preview-link');
    tick();
    fixture.detectChanges();
    expect(router.url).toEqual('/pico-preview');
    expect(query(fixture, 'app-pico-preview')).not.toBeNull();
  }));
});
