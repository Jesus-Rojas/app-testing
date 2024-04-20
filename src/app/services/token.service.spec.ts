import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('Tests for TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TokenService ]
    })

    tokenService = TestBed.inject(TokenService);
    localStorage.clear();
  });

  it('should be create', () => {
    expect(tokenService).toBeTruthy();
  });

  it('Test for saveToken', () => {
    const currentToken = localStorage.getItem('token');
    const newToken = 'test';
    tokenService.saveToken(newToken);
    expect(currentToken).not.toEqual(newToken);
  });

  it('Test for getToken', () => {
    expect(tokenService.getToken()).toBeNull();
  });

  it('Test for removeToken', () => {
    tokenService.saveToken('test');
    tokenService.removeToken();
    expect(tokenService.getToken()).toBeNull();
  });
});