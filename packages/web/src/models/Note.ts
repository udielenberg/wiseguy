import faker from 'faker';

export type ResourceState = "fresh" | "undecided" | "approved" | "rejected"
export interface Resource {
    id: string;
    state: ResourceState;
    tags: string[];
    rating: number;
    link: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    images?: string[];
    writtenBy: string;
    readingTime: number;
}
export interface Note {
    id: string;
    created: Date;
    search: string;
    tags: Array<string>;
    lastVisit: Date;
    watched: boolean;
    resources: Resource[];

}

export const resourceStates: ResourceState[] = ["fresh", "undecided", "approved", "rejected"];

export const baseNote: Note = {
    id: faker.random.uuid(),
    created: new Date(),
    search: '',
    tags: [],
    lastVisit: new Date(),
    watched: false,
    resources: [],
}

export const baseResource: Resource = {
    id: faker.random.uuid(),
    state: "fresh",
    tags: [],
    link: '',
    rating: 0,
    description: '',
    images: [],
    createdAt: new Date(),
    readingTime: 0,
    writtenBy: ''
}