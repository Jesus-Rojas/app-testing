import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import {
  fakeActivatedRouteSnapshot,
  fakeParamMap,
  fakeRouterStateSnapshot
} from '../../testing';
import { generateOneUser } from '../mocks/user.mock';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
        expect(router.navigate).toHaveBeenCalledWith(['/']);
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
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });
  });
});
