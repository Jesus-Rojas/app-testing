import { ActivatedRouteStub } from "./activated-route-stub";
import { fakeParamMap } from "./snapshot";

describe('Tests for ActivatedRouteStub', () => {
  let activatedRouteStub: ActivatedRouteStub;
  
  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();
  });

  it('Test for setParamMap', (doneFn) => {
    const mock = { id: '222' };
    activatedRouteStub.setParamMap(mock);
    activatedRouteStub.paramMap.subscribe((value) => {
      expect(value).toEqual(fakeParamMap(mock));
      doneFn();
    })
  });

  it('Test for setQueryParamMap', (doneFn) => {
    const mock = { id: '222' };
    activatedRouteStub.setQueryParamMap(mock);
    activatedRouteStub.queryParamMap.subscribe((value) => {
      expect(value).toEqual(fakeParamMap(mock));
      doneFn();
    })
  });
});
