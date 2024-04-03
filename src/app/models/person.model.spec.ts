import { Person } from "./person.model";

fdescribe('Tests for Person', () => {
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
      // Arrange
      person.weigth = 40;
      person.heigth = 1.65;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('down');
    });

    it('Sholud be return a string: normal', () => {
      // Arrange
      person.weigth = 58;
      person.heigth = 1.65;
      // Act
      const rta = person.calcIMC();
      // Assert
      expect(rta).toEqual('normal');
    });
  });
});