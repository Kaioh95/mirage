import { User } from "./User";

export interface Post{
    _id: string;
    title: string;
    tags: Array<string>;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    likes?: number;
    comments?: number;
    views?: number;
}