import { Resource } from 'models/Note';
import faker from 'faker';
import range from 'lodash/range';
import { baseNote, Note, resourceStates, baseResource } from 'models/Note'

const setIncludeWords = () => range(faker.random.number({ min: 0, max: 3 })).map(_ => faker.commerce.product())

const randomArrayOfImages = () => range(faker.random.number({ min: 0, max: 5 })).map(_ => faker.image.avatar())

const createDummyResource = (noteId: string): Resource => ({
  ...baseResource,
  id: faker.random.uuid(),
  noteId,
  state: faker.random.arrayElement(resourceStates),
  link: 'http://www.walla.co.il',
  rating: faker.random.number({ min: 1, max: 1000 }),
  description: faker.random.words(),
  images: randomArrayOfImages(),
  readingTime: faker.random.number({ min: 60, max: 5000 }),
  writtenBy: faker.name.findName()
});


export const setResources = (noteId: string) => range(10).map(_ => createDummyResource(noteId))

const createDummyNote = (): Note => {
  const id = faker.random.uuid();
  return {
    ...baseNote,
    id,
    includeWords: setIncludeWords(),
    search: faker.lorem.words(),
    resources: setResources(id),
  }
};

export const dummyNotes: Note[] = range(10).map((_) => createDummyNote());
