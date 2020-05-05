import { Resource } from './../models/Note';
import faker from 'faker';
import range from 'lodash/range';
import { baseNote, Note, resourceStates, baseResource } from 'models/Note'

const setIncludeWords = () => range(faker.random.number({ min: 0, max: 3 })).map(_ => faker.commerce.product())

const randomArrayOfImages = () => range(faker.random.number({ min: 0, max: 5 })).map(_ => faker.image.avatar())

const createDummyResource = (): Resource => ({
  ...baseResource,
  id: faker.random.uuid(),
  state: faker.random.arrayElement(resourceStates),
  includeWords: undefined,
  link: 'http://www.walla.co.il',
  rating: faker.random.number({ min: 1, max: 1000 }),
  description: faker.random.words(),
  images: randomArrayOfImages(),
  readingTime: faker.random.number({ min: 60, max: 5000 }),
  writtenBy: faker.name.findName()
});


const setResources = () => range(10).map(_ => createDummyResource())

const createDummyNote = (): Note => ({
  ...baseNote,
  id: faker.random.uuid(),
  includeWords: setIncludeWords(),
  search: faker.lorem.words(),
  resources: setResources(),
});

export const dummyNotes: Note[] = range(10).map((_) => createDummyNote());
