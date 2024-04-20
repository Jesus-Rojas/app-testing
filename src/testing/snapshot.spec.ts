import {
  fakeActivatedRouteSnapshot,
  fakeParamMap,
  fakeRouterStateSnapshot
} from "./snapshot";

describe('Tests for snapshot', () => {
  describe('Tests for fakeRouterStateSnapshot', () => {
    it('Should return the send parameter as RouterStateSnapshot', () => {
      const mock = { url: 'example' };
      const routerStateSnapshot = fakeRouterStateSnapshot(mock);
      expect(routerStateSnapshot.url).toEqual(mock.url);
    });

    it('Should return default paramater', () => {
      const routerStateSnapshot = fakeRouterStateSnapshot();
      expect(routerStateSnapshot.url).toBeUndefined();
    });
  });

  describe('Tests for fakeActivatedRouteSnapshot', () => {
    it('Should return the send parameter as ActivatedRouteSnapshot', () => {
      const mock = { url: [] };
      const activatedRouteSnapshot = fakeActivatedRouteSnapshot(mock);
      expect(activatedRouteSnapshot.url.length).toEqual(mock.url.length);
    });

    it('Should return default paramater', () => {
      const activatedRouteSnapshot = fakeActivatedRouteSnapshot();
      expect(activatedRouteSnapshot.url).toBeUndefined();
    });
  });

  describe('Tests for fakeParamMap', () => {
    it('Should return the send parameter as ParamMap', () => {
      const mock = { url: "example" };
      const routerStateSnapshot = fakeParamMap(mock);
      expect(routerStateSnapshot.get('url')).toEqual(mock.url);
    });

    it('Should return default paramater', () => {
      const routerStateSnapshot = fakeParamMap();
      expect(routerStateSnapshot.keys.length).toEqual(0);
    });
  });
});
