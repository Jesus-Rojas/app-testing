import { EnvironmentInjector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { fakeActivatedRouteSnapshot, fakeParamMap, fakeRouterStateSnapshot } from 'src/testing';
import { generateOneUser } from '../mocks/user.mock';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: TokenService,
          useValue: tokenServiceSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true with session', (doneFn) => {
    const userMock = generateOneUser();
    authService.user$ = of(userMock);
    const activatedRoute = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMap({
        idProduct: '123213',
      }),
    });
    const routerState = fakeRouterStateSnapshot();
    guard
      .canActivate(activatedRoute, routerState)
      .subscribe((rta) => {
        expect(rta).toBeTruthy();
        doneFn();
      });
  });

  it('should return false without session', (doneFn) => {
    authService.user$ = of(null);
    const activatedRoute = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMap({
        idProduct: '123213',
      }),
    });
    const routerState = fakeRouterStateSnapshot();
    guard
      .canActivate(activatedRoute, routerState)
      .subscribe((rta) => {
        expect(rta).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        doneFn();
      });
  });

  it('should return false with idProduct Params', (doneFn) => {
    authService.user$ = of(null);
    const activatedRoute = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMap({
        idProduct: '123213',
      }),
    });
    const routerState = fakeRouterStateSnapshot();
    guard
      .canActivate(activatedRoute, routerState)
      .subscribe((rta) => {
        expect(rta).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        doneFn();
      });
  });
});
