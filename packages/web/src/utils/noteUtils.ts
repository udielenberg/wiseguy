import { Note, NoteSearchAndWords } from "models/Note";
import { baseNote } from "models/Note";
import faker from "faker";

export const createNote = (note: NoteSearchAndWords): Note => {
    return {
        ...baseNote,
        ...note,
        id: faker.random.uuid(),
    };
};