import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import {
  clickElementById,
  getText,
  getTextById,
  observableSuccess,
  query,
  queryAllByDirective
} from "../testing";
import { AppComponent } from "./app.component";
import { routes } from "./app-routing.module";
import { AppModule } from "./app.module";
import { ProductsService } from "./products/services/products.service";
import { generateManyProducts } from "./mocks/product.mock";
import { AuthService } from "./services/auth.service";
import { generateOneUser } from "./mocks/user.mock";
import { NgZone } from "@angular/core";

describe('App Integration Test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;
  let ngZone: NgZone;

  beforeEach(fakeAsync(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

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
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // providers
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    router.initialNavigation();
    tick();
    fixture.detectChanges();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const elements = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(elements.length).toEqual(7);
  });

  it('should render OthersComponent when clicked with session', fakeAsync(() => {
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(observableSuccess(productsMock));
    const userMock = generateOneUser();
    authService.user$ = of(userMock);
    
    clickElementById(fixture, 'others-link');
    tick(); // wait while nav ...
    fixture.detectChanges();
    tick(); // exec productsService.getAll()
    fixture.detectChanges(); // update html

    expect(router.url).toEqual('/others');
    expect(query(fixture, 'app-others')).not.toBeNull();
    expect(getTextById(fixture, 'products-length')).toContain(productsMock.length);
  }));

  it('should render OthersComponent when clicked without session', fakeAsync(() => {
    authService.user$ = of(null);
    
    clickElementById(fixture, 'others-link');

    tick(); // wait while nav ...
    fixture.detectChanges();

    tick(); // exec productsService.getAll()
    fixture.detectChanges(); // update html

    expect(router.url).toEqual('/');
  }));

  it('should render PicoPreviewComponent when clicked', fakeAsync(() => {
    clickElementById(fixture, 'pico-preview-link');
    tick();
    fixture.detectChanges();
    expect(router.url).toEqual('/pico-preview');
    expect(query(fixture, 'app-pico-preview')).not.toBeNull();
  }));

  it('should lazy load the auth module', ((doneFn) => {
    const url = '/auth/login';
    ngZone.run(() => {
      router.navigateByUrl(url)
        .then(() => (expect(router.url).toBe(url)))
        .catch((error) => console.error('Error during navigation:', error))
        .finally(doneFn)
    });
  }));

  it('should lazy load the products module', ((doneFn) => {
    const url = '/products';
    ngZone.run(() => {
      router.navigateByUrl(url)
        .then(() => (expect(router.url).toBe(url)))
        .catch((error) => console.error('Error during navigation:', error))
        .finally(doneFn)
    });
  }));
});
