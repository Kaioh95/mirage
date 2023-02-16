import { User } from "./User";

export interface Comment{
    _id: string;
    text: string;
    post_id: string;
    createdAt: string;
    updatedAt: string;
    user: User;
} 