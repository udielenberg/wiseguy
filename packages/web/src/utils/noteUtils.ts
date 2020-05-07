import { Note, NoteSearchAndWords, WordOption } from "models/Note";
import { baseNote } from "models/Note";
import faker from "faker";

export const createNote = (note: NoteSearchAndWords): Note => ({
    ...baseNote,
    ...note,
    id: faker.random.uuid(),
});