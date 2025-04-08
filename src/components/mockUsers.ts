import { faker } from '@faker-js/faker';

export interface User {
  id: number;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
}

export function generateUsers(count: number): User[] {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: faker.person.fullName(),
      balance: parseFloat(faker.finance.amount({ min: 100, max: 10000, dec: 2 })),
      email: faker.internet.email(),
      registerAt: faker.date.past({ years: 5 }),
      active: faker.datatype.boolean(),
    });
  }

  return users;
}
