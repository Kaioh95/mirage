export interface User {
    _id: string;
    name?: string;
    email: string;
    password: string;
    confirmpassword?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: string;
}