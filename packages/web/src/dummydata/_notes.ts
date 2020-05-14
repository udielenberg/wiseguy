import { Resource } from 'models/Note';
import faker from 'faker';
import range from 'lodash/range';
import { resourceStates, baseResource, Paragraph } from 'models/Note'
import psl from 'psl'
import get from 'lodash/get'
const randomRange = faker.random.number({ min: 0, max: 5 })
const randomArrayOfImages = () => range(randomRange).map(_ => faker.image.avatar())

const createDummyParagraphWithWord = (word: string) => {
  function injectWord() {
    const para = faker.lorem.paragraph();
    const injectedParagraph = `${para.slice(3, 8)} ${word}  ${para.slice(8, para.length - 1)}`;
    return injectedParagraph
  }

  return range(randomRange).map(_ => injectWord())
}
const createDummyRelevantParagraphs = (includedWords: string[]): Paragraph[] =>
  includedWords.map(word => ({ [word]: createDummyParagraphWithWord(word) }))


const createDummyResource = (noteId: string, includedWords: string[]): Resource => {
  const link = faker.internet.domainName();
  const domain = get(psl.parse(link), 'domain', link);

  return {
    ...baseResource,
    id: faker.random.uuid(),
    noteId,
    state: faker.random.arrayElement(resourceStates),
    link,
    domain,
    rating: faker.random.number({ min: 1, max: 1000 }),
    description: faker.random.words(),
    images: randomArrayOfImages(),
    readingTime: faker.random.number({ min: 60, max: 5000 }),
    writtenBy: faker.name.findName(),
    relevantParagraphs: createDummyRelevantParagraphs(includedWords)
  }
};


export const setDummyResources = (noteId: string, includedWords: string[]) => range(10).map(_ => createDummyResource(noteId, includedWords))
