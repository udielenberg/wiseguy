import faker from 'faker';
import range from 'lodash/range';

export interface Note {
  id: string;
  date: Date;
  search: string;
  tags: Array<string>;
  lastVisit: Date;
}

const setTags = () => range(faker.random.number({ min: 0, max: 3 })).map(_ => faker.commerce.product())

export const notes: Note[] = range(10).map((_) => ({
  id: faker.random.uuid(),
  date: new Date(),
  search: faker.lorem.words(),
  tags: setTags(),
  lastVisit: new Date()
}));
