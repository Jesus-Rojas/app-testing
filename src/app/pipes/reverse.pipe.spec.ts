import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(async () => {
    pipe = new ReversePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform "123" to "321"', () => {
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});
