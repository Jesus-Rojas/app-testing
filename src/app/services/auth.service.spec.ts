import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as _ from 'lodash';

import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        TokenService
      ]
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
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
      spyOn(tokenService, 'saveToken').and.callThrough();
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
});
