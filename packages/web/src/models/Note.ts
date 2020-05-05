
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
    includeWords: Array<string>;
    watched: boolean;
    resources: Resource[];

}

export const resourceStates: ResourceState[] = ["fresh", "undecided", "approved", "rejected"];
export type NoteSearchAndWords = Pick<Note, "search" | "includeWords">;


export const baseNote: Note = {
    id: '',
    created: new Date(),
    search: undefined,
    includeWords: [],
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