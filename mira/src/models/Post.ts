
export interface Post{
    _id: string;
    title: string;
    tags: Array<string> | string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    likes?: number;
    comments?: number;
    views?: number;
}