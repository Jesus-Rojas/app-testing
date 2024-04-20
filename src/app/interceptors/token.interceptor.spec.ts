import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TokenService } from '../services/token.service';
import { TokenInterceptor } from './token.interceptor';

describe('Tests for TokenInterceptor', () => {
  let httpClient: HttpClient;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should return request with Authorization', () => {
    spyOn(tokenService, 'getToken').and.returnValue('123');
    httpClient.get('example').subscribe();
    const req = httpController.expectOne('example');
    const headers = req.request.headers;
    expect(headers.get('Authorization')).toBeDefined();
  });

  it('Should return request without Authorization', () => {
    spyOn(tokenService, 'getToken').and.returnValue(null);
    httpClient.get('example').subscribe();
    const req = httpController.expectOne('example');
    const headers = req.request.headers;
    expect(headers.get('Authorization')).toBeNull();
  });
});
