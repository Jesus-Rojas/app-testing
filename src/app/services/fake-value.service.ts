export class FakeValueService {
  getValue() {
    return 'fake value';
  }

  setValue(value: string) { }

  getPromiseValue() {
    return Promise.resolve('fake promise value');
  }
}
