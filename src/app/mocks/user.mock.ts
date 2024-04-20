import * as faker from 'faker';
import { User } from '../models/user.model';

export const generateOneUser = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  role: 'customer'
});
