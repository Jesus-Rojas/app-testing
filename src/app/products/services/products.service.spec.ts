import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';

import { ProductsService } from './products.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { generateManyProducts, generateOneProduct } from '../../mocks/product.mock';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ]
    });

    productsService = TestBed.inject(ProductsService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(5);
      spyOn(tokenService, 'getToken').and.returnValue('123');

      productsService.getAllSimple().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products).toEqual(mockData);
        doneFn()
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
  });

  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(5);

      productsService.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // -100 * .19 = 0
        }
      ];

      productsService.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = '10';
      const offset = '3';

      productsService.getAll(+limit, +offset).subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });
      
      const queryParams = new URLSearchParams({ limit, offset }).toString();
      const url = `${environment.API_URL}/api/v1/products?${queryParams}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit);
      expect(params.get('offset')).toEqual(offset);
    });
  });

  describe('tests for create', () => {
    it('should return a new product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'New product',
        price: 100,
        images: ['img'],
        description: 'Description product',
        categoryId: 12,
      };

      productsService.create(_.cloneDeep(dto)).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('tests for update', () => {
    it('should update a product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'New product',
      };
      const productId = '1';

      productsService.update(productId, _.cloneDeep(dto)).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('tests for delete', () => {
    it('should delete a product', (doneFn) => {
      const mockData = true;
      const productId = '1';

      productsService.delete(productId).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('tests for getOne', () => {
    it('should return a product', (doneFn) => {
      const mockData = generateOneProduct();
      const productId = '1';

      productsService.getOne(productId).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it(`should return the right msg when the status code is ${HttpStatusCode.NotFound}`, (doneFn) => {
      const productId = '1';

      productsService.getOne(productId)
        .subscribe({
          error: (error) => {
            expect(error).toEqual('El producto no existe');
            doneFn();
          },
        });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush('', { status: HttpStatusCode.NotFound, statusText: '' });
      expect(req.request.method).toEqual('GET');
    });

    it(`should return the right msg when the status code is ${HttpStatusCode.Conflict}`, (doneFn) => {
      const productId = '1';

      productsService.getOne(productId)
        .subscribe({
          error: (error) => {
            expect(error).toEqual('Algo esta fallando en el server');
            doneFn();
          },
        });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush('', { status: HttpStatusCode.Conflict, statusText: '' });
      expect(req.request.method).toEqual('GET');
    });

    it(`should return the right msg when the status code is ${HttpStatusCode.Unauthorized}`, (doneFn) => {
      const productId = '1';

      productsService.getOne(productId)
        .subscribe({
          error: (error) => {
            expect(error).toEqual('No estas permitido');
            doneFn();
          },
        });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush('', { status: HttpStatusCode.Unauthorized, statusText: '' });
      expect(req.request.method).toEqual('GET');
    });

    it(`should return the right msg when the status code is ${HttpStatusCode.TooManyRequests}`, (doneFn) => {
      const productId = '1';

      productsService.getOne(productId)
        .subscribe({
          error: (error) => {
            expect(error).toEqual('Ups algo salio mal');
            doneFn();
          },
        });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush('', { status: HttpStatusCode.TooManyRequests, statusText: '' });
      expect(req.request.method).toEqual('GET');
    });
  });
  

  describe('tests for updateImages', () => {
    it('should parse and clean product images list and should filter out products with invalid or placeholder images', () => {
      const urlImageExpected = 'https://invalid-image.com/product.jpg';
      const expectedId = '123';
      const productsMocked = generateManyProducts(3);
      productsMocked[0].images = [`["${urlImageExpected}", "https://valid-image.com/product2.jpg"]`];
      productsMocked[1].images = ['https://placeimg.com/640/480/any'];
      productsMocked[2].id = expectedId;

      const products = productsService.updateImages(productsMocked);

      expect(products[0].images[0]).toEqual(urlImageExpected);
      expect(products[1].id).toEqual(expectedId);
    });
  });

  describe('tests for getByCategory', () => {
    it('should return products by categoryId, without offset and without limit', () => {
      const categoryId = '1';
      const mockProducts = generateManyProducts();

      productsService.getByCategory(categoryId).subscribe((products) => {
        expect(products.length).toEqual(mockProducts.length);
      });

      const url = `${environment.API_URL}/api/v1/categories/${categoryId}/products`;
      const req = httpController.expectOne(url);
      req.flush(mockProducts);
    });

    it('should return products by categoryId, with offset and with limit', () => {
      const categoryId = '1';
      const mockProducts = generateManyProducts();
      const limit = '10';
      const offset = '1';

      productsService.getByCategory(categoryId, +limit, +offset).subscribe((products) => {
        expect(products.length).toEqual(mockProducts.length);
      });

      const queryParams = new URLSearchParams({ limit, offset }).toString();
      const url = `${environment.API_URL}/api/v1/categories/${categoryId}/products?${queryParams}`;
      const req = httpController.expectOne(url);
      req.flush(mockProducts);

      const { params } = req.request;
      expect(params.get('limit')).toEqual(limit);
      expect(params.get('offset')).toEqual(offset);
    });
  });

  it('test for fetchReadAndUpdate', (doneFn) => {
    const productMock = { ...generateOneProduct(), id: '1' };
    const dto = { title: 'example' };
    const getOneSpy = spyOn(productsService, 'getOne').and.returnValue(of(productMock));
    const updateSpy = spyOn(productsService, 'update').and.returnValue(of({ ...productMock, ...dto }));
    productsService
      .fetchReadAndUpdate(productMock.id, dto)
      .subscribe(() => {
        expect(getOneSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
        doneFn();
      });
  });
});
