export interface AddPost {
    title: string;
    description: string;
}

export interface EditPost {
    id: string;
    description: string;
}

export interface IPost {
    id: string;
    title: string;
    description: string;
    date?: Date;
}