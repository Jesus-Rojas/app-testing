import { generateManyUsers, generateOneUser } from "./user.mock";

describe('Tests for user.mock.ts', () => {
  describe('Tests for generateOneUser', () => {
    it('Should return one user', () => {
      const productMock = generateOneUser();
      expect(productMock.name).toBeDefined();
    });
  });

  describe('Tests for generateManyUsers', ()=> {
    it('Should return 10 users by default', () => {
      const quantityOfExpectedUsers = 10;
      const users = generateManyUsers();
      expect(users.length).toEqual(quantityOfExpectedUsers);
    });

    it('Should return 20 users by paramater', () => {
      const quantityOfExpectedUsers = 20;
      const users = generateManyUsers(quantityOfExpectedUsers);
      expect(users.length).toEqual(quantityOfExpectedUsers);
    });
  });
});
