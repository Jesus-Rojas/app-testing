import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { generateManyUsers, generateOneUser } from 'src/app/mocks/user.mock';
import { CreateUserDTO } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for create', () => {
    it('should return a new user', (doneFn) => {
      const mockData = generateOneUser();
      const dto: CreateUserDTO = {
        email: 'jesus@gmail.com',
        name: 'Jesus',
        password: '00000000',
        role: 'customer',
      };

      service.create(_.cloneDeep(dto)).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/users`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('tests for getAll', () => {
    it('should return users', (doneFn) => {
      const mockData = generateManyUsers(10);

      service.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/users`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('tests for isAvailableByEmail', () => {
    it('should return true in isAvailable', (doneFn) => {
      const mockData = { isAvailable: true };
      const email = 'jesus@gmail.com';

      service.isAvailableByEmail(email).subscribe(({ isAvailable }) => {
        expect(isAvailable).toBeTruthy();
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/users/is-available`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual({ email });
      expect(req.request.method).toEqual('POST');
    });

    it('should return false in isAvailable', (doneFn) => {
      const mockData = { isAvailable: false };
      const email = 'jesus@gmail.com';

      service.isAvailableByEmail(email).subscribe(({ isAvailable }) => {
        expect(isAvailable).toBeFalsy();
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/users/is-available`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual({ email });
      expect(req.request.method).toEqual('POST');
    });
  });
});
