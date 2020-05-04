
export type ResourceState = "fresh" | "undecided" | "approved" | "rejected"
export interface Resource {
    id: string;
    state: ResourceState;
    tags: string[];
    rating: number;
    link: string | undefined;
    description: string | undefined;
    createdAt: Date;
    updatedAt?: Date;
    images?: string[];
    writtenBy: string | undefined;
    readingTime: number;
}
export interface Note {
    id: string;
    created: Date;
    search: string | undefined;
    tags: Array<string>;
    lastVisit: Date;
    watched: boolean;
    resources: Resource[];

}

export const resourceStates: ResourceState[] = ["fresh", "undecided", "approved", "rejected"];

export const baseNote: Note = {
    id: '',
    created: new Date(),
    search: undefined,
    tags: [],
    lastVisit: new Date(),
    watched: false,
    resources: [],
}

export const baseResource: Resource = {
    id: '',
    state: "fresh",
    tags: [],
    link: undefined,
    rating: 0,
    description: undefined,
    images: [],
    createdAt: new Date(),
    readingTime: 0,
    writtenBy: undefined
}