import faker from 'faker';
import range from 'lodash/range';

export interface Note {
  id: string;
  created: Date;
  search: string;
  tags: Array<string>;
  lastVisit: Date;
  watched: boolean
}

const setTags = () => range(faker.random.number({ min: 0, max: 3 })).map(_ => faker.commerce.product())

export const notes: Note[] = range(10).map((_) => ({
  id: faker.random.uuid(),
  created: new Date(),
  search: faker.lorem.words(),
  tags: setTags(),
  lastVisit: new Date(),
  watched: false
}));
