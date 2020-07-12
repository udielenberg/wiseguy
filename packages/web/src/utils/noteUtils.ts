import { ExtendedResource } from './../models/Note';
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

export const sortNoteResources = (note: Note) => note.resources.reduce((all: any, resource: Resource) => {
    const extendedResource: ExtendedResource = { ...resource, noteSearch: note.search }
    if (all[resource.state]) {
        all[resource.state].push(extendedResource);
    } else {
        all[resource.state] = [];
        all[resource.state].push(extendedResource);
    }
    return all;
}, {});

export interface SortedAllResources {
    fresh: ExtendedResource[];
    approved: ExtendedResource[];
    rejected: ExtendedResource[];
}

export const sortAllResourcesByState = (notes: Note[]): SortedAllResources => {
    return notes.reduce((allResources: any, note: Note, index: number) => {
        const sortedResourcesByNote = sortNoteResources(note);
        return {
            fresh: [...allResources.fresh, sortedResourcesByNote.fresh ? [...sortedResourcesByNote.fresh] : []].flat(),
            approved: [...allResources.approved, sortedResourcesByNote.approved ? [...sortedResourcesByNote.approved] : []].flat(),
            rejected: [...allResources.rejected, sortedResourcesByNote.rejected ? [...sortedResourcesByNote.rejected] : []].flat(),
        }
    }, { fresh: [], approved: [], rejected: [] })
}