import { Note, NoteSearchAndWords, WordOption, Resource } from "models/Note";
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

export const sortNoteResources = (resources: any) => resources?.reduce((all: any, resource: Resource) => {
    if (all[resource.state]) {
        all[resource.state].push(resource);
    } else {
        all[resource.state] = [];
        all[resource.state].push(resource);
    }
    return all;
}, {});

export interface SortedAllResources {
    fresh: Resource[];
    approved: Resource[];
    rejected: Resource[];
}

export const sortAllResourcesByState = (notes: Note[]): SortedAllResources => {
    return notes.reduce((allResources: any, note: Note, index: number) => {
        const sortedResourcesByNote = sortNoteResources(note.resources);
        return {
            fresh: [...allResources.fresh, sortedResourcesByNote.fresh ? [...sortedResourcesByNote.fresh] : []].flat(),
            approved: [...allResources.approved, sortedResourcesByNote.approved ? [...sortedResourcesByNote.approved] : []].flat(),
            rejected: [...allResources.rejected, sortedResourcesByNote.rejected ? [...sortedResourcesByNote.rejected] : []].flat(),
        }
    }, { fresh: [], approved: [], rejected: [] })
}