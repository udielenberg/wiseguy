import faker from 'faker';
import range from 'lodash/range';
import { baseNote, Note } from 'models/Note'

const setTags = () => range(faker.random.number({ min: 0, max: 3 })).map(_ => faker.commerce.product())

const setResources = () => ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
const setApproved = () => ['good', 'true', 'nice']
const setRejected = () => ['evil', 'bad', 'lie']

export const dummyNotes: Note[] = range(10).map((_) => ({
  ...baseNote,
  tags: setTags(),
  search: faker.lorem.words(),
  resources: setResources(),
  approved: setApproved(),
  rejected: setRejected()
}));
