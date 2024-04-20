import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { of, take } from 'rxjs';
import { generateOneUser } from '../mocks/user.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: jasmine.SpyObj<TokenService>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {
          provide: TokenService,
          useValue: jasmine.createSpyObj('TokenService', ['saveToken', 'getToken', 'removeToken']),
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });

  describe('tests for login', () => {
    it('should call to saveToken', (doneFn) => {
      const mockData: Auth = {
        access_token: 'Bearer 123',
      };
      const email = 'jesus@gmail.com';
      const password = '00000000';
      authService.login(email, password)
        .subscribe((data) => {
          expect(data).toEqual(mockData);
          expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
          expect(tokenService.saveToken).toHaveBeenCalledWith(mockData.access_token);
          doneFn();
        });

      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('tests for getCurrentUser', () => {
    it('should call getProfile if token is present', () => {
      tokenService.getToken.and.returnValue('123');
      const mockUser = of(generateOneUser());
      const getProfileSpy = spyOn(authService, 'getProfile').and.returnValue(mockUser);

      authService.getCurrentUser();

      expect(getProfileSpy).toHaveBeenCalled();
    });

    it('should not call getProfile if token is not present', () => {
      tokenService.getToken.and.returnValue(null);
      const getProfileSpy = spyOn(authService, 'getProfile');
      
      authService.getCurrentUser();

      expect(getProfileSpy).not.toHaveBeenCalled();
    });
  });

  describe('tests for getProfile', () => {
    it('should get user profile and update the user BehaviorSubject', fakeAsync(() => {
      const url = `${environment.API_URL}/api/v1/auth/profile`;
      const mockUser = generateOneUser();
      
      authService.getProfile().subscribe();
      const req = httpController.expectOne(url);
      req.flush(mockUser);

      tick();

      authService.user$.pipe(take(1)).subscribe((user) => {
        expect(user).toEqual(mockUser);
      });
    }));
  });

  describe('tests for loginAndGet', () => {
    it('should do login and getProfile', (doneFn) => {
      const email = 'jesus@gmail.com';
      const password = '00000000';
      const mockUser = generateOneUser();
      const getProfileSpy = spyOn(authService, 'getProfile').and.returnValue(of(mockUser));
      const loginSpy = spyOn(authService, 'login').and.returnValue(of({ access_token: 'test' }));
      
      authService.loginAndGet(email, password).subscribe((user) => {
        expect(loginSpy).toHaveBeenCalled();
        expect(getProfileSpy).toHaveBeenCalled();
        expect(user).toEqual(mockUser);
        doneFn();
      });
    });
  });

  describe('tests for logout', () => {
    it('should remove token and update the user', ((doneFn) => {
      authService.logout();
      expect(tokenService.removeToken).toHaveBeenCalled();
      authService.user$.pipe(take(1)).subscribe((user) => {
        expect(user).toBeNull();
        doneFn();
      })
    }));
  });
});
