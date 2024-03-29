import { User } from "./User";

export interface PostAndUser{
    _id: string;
    title: string;
    tags: Array<string> | string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    likes?: number;
    comments?: number;
    views?: number;
}