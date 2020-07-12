
export type ResourceState = "fresh" | "approved" | "rejected"
export interface Paragraph {
    [key: string]: string[]
}


export interface Resource {
    id: string;
    noteId: string;
    state: ResourceState;
    rating: number;
    link: string | undefined;
    description: string | undefined;
    createdAt: Date;
    updatedAt?: Date;
    images?: string[];
    writtenBy: string | undefined;
    readingTime: number;
    domain: string;
    relevantParagraphs: Paragraph[]
}

export type ExtendedResource = Resource & { noteSearch: string | undefined }

export interface Note {
    id: string;
    created: Date;
    search: string | undefined;
    includeWords: Array<string>;
    watched: boolean;
    resources: Resource[];

}

export const resourceStates: ResourceState[] = ["fresh", "approved", "rejected"];
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
    noteId: '',
    state: "fresh",
    link: undefined,
    rating: 0,
    description: undefined,
    images: [],
    domain: "",
    createdAt: new Date(),
    readingTime: 0,
    writtenBy: undefined,
    relevantParagraphs: []
}


export interface WordOption {
    label: string;
    value: string;
}