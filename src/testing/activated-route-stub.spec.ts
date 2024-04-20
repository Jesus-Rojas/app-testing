import { ActivatedRouteStub } from "./activated-route-stub";
import { fakeParamMap } from "./snapshot";

describe('Tests for ActivatedRouteStub', () => {
  let activatedRouteStub: ActivatedRouteStub;
  
  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();
  });

  describe('Test for setParamMap', () => {
    it('should set the paramMap correctly with params', (doneFn) => {
      const params = { id: '222', name: 'test' };
      activatedRouteStub.setParamMap(params);
      activatedRouteStub.paramMap.subscribe((value) => {
        expect(value).toEqual(fakeParamMap(params));
        doneFn();
      });
    });
  
    it('should set the paramMap correctly with no params', (doneFn) => {
      activatedRouteStub.setParamMap();
      activatedRouteStub.paramMap.subscribe((value) => {
        expect(value).toEqual(fakeParamMap({}));
        doneFn();
      });
    });
  });

  describe('Test for setQueryParamMap', () => {
    it('should set the queryParamMap correctly with params', (doneFn) => {
      const queryParams = { page: '1', order: 'desc' };
      activatedRouteStub.setQueryParamMap(queryParams);
      activatedRouteStub.queryParamMap.subscribe((value) => {
        expect(value).toEqual(fakeParamMap(queryParams));
        doneFn();
      });
    });
  
    it('should set the queryParamMap correctly with no params', (doneFn) => {
      activatedRouteStub.setQueryParamMap();
      activatedRouteStub.queryParamMap.subscribe((value) => {
        expect(value).toEqual(fakeParamMap({}));
        doneFn();
      });
    });
  });
});
