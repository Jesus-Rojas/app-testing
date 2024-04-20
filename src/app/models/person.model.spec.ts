import { Person } from "./person.model";

describe('Tests for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Jesus', 'Rojas', 23, 65, 1.65);
  });

  it('attrs', () => {
    expect(person.name).toEqual('Jesus');
    expect(person.lastName).toEqual('Rojas');
    expect(person.age).toEqual(23);
  });

  describe('test for calcIMC', () => {
    it('Sholud be return a string: down', () => {
      person.weigth = 40;
      expect(person.calcIMC()).toEqual('down');
    });

    it('Sholud be return a string: normal', () => {
      person.weigth = 58;
      expect(person.calcIMC()).toEqual('normal');
    });

    it('Sholud be return a string: not found', () => {
      person.weigth = -58;
      expect(person.calcIMC()).toEqual('not found');
    });

    it('Sholud be return a string: not found', () => {
      person.weigth = -58;
      expect(person.calcIMC()).toEqual('not found');
    });

    it('Sholud be return a string: overweigth', () => {
      person.weigth = 68;
      expect(person.calcIMC()).toEqual('overweigth');
    });

    it('Sholud be return a string: overweigth level 1', () => {
      person.weigth = 78;
      expect(person.calcIMC()).toEqual('overweigth level 1');
    });

    it('Sholud be return a string: overweigth level 2', () => {
      person.weigth = 88;
      expect(person.calcIMC()).toEqual('overweigth level 2');
    });

    it('Sholud be return a string: overweigth level 3', () => {
      person.weigth = 118;
      expect(person.calcIMC()).toEqual('overweigth level 3');
    });
  });
});