export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}