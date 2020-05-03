import faker from 'faker';

export interface Note {
    id: string;
    created: Date;
    search: string;
    tags: Array<string>;
    lastVisit: Date;
    watched: boolean
    resources: any[], //RETHINK THIS
    approved: any[], //RETHINK THIS
    rejected: any[], //RETHINK THIS
}

export const baseNote: Note = {
    id: faker.random.uuid(),
    created: new Date(),
    search: '',
    tags: [],
    lastVisit: new Date(),
    watched: false,
    resources: [], //RETHINK THIS
    approved: [], //RETHINK THIS
    rejected: [], //RETHINK THIS
}