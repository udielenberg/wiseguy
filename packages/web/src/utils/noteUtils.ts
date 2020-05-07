import { Note, NoteSearchAndWords, WordOption } from "models/Note";
import { baseNote } from "models/Note";
import faker from "faker";

export const createNote = (note: NoteSearchAndWords): Note => ({
    ...baseNote,
    ...note,
    id: faker.random.uuid(),
});

export const cleanedWordsList = (words: WordOption[]) => words.reduce((agg, option: WordOption) => {
    if (option.label) {
        return [...agg, option.label];
    }
    return agg;
}, [] as string[]);