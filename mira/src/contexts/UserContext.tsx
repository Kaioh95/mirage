import { createContext, ReactNode, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { ResponseType, useRequest } from "../hooks/useRequest";
import { User } from "../models/User";

export type UserRequest = Omit<User, 'image' | 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserEditRequest = Omit<User, 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserLoginRequest = Omit<User, 'name' | 'confirmPassword' | 'image' | 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserLoginResponse = {message: string; token: string; userId: string};

interface UserContextType{
    isUserLogged: boolean;
    isUserLoginLoading: boolean;
    isUserRegisterLoading: boolean;
    registerUser?: (data: UserRequest) => Promise<ResponseType>;
    loginUser?: (data: UserLoginRequest) => Promise<ResponseType>;
    getUserById?: (data: {id: string}) => Promise<
        | {
            success: undefined;
            error: Error
        }
        | {
            success: User;
            error: undefined;
        }
    >;
    getAllUsers?: () => Promise<
        | {
            success: undefined;
            error: Error
        }
        | {
            success: User[];
            error: undefined;
        }
    >
    deleteUser?: (data: {id: string, token: string}) => Promise<ResponseType>;
    editUser?: (data: UserEditRequest) => Promise<ResponseType>;
};

interface UserContextProviderProps{
    children: ReactNode
};

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const { runRequest } = useRequest();
    const [token, setToken] = usePersistedState<string>('token', '-1');
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isUserLoginLoading, setIsUserLoginLoading] = useState(false);
    const [isUserRegisterLoading, setIsUserRegisterLoading] = useState(false);

    const loginUser = async (data: UserLoginRequest) => {
        setIsUserLogged(false);
        setIsUserLoginLoading(true);

        const customErrorMsg = 'Error trying to login.'

        const response = await runRequest<UserLoginResponse, UserLoginRequest>(
            '',
            'post',
            undefined,
            data,
            customErrorMsg
        );

        setIsUserLoginLoading(false);

        if(response instanceof Error){
            return {
                success: undefined,
                error: response,
            }
        }

        setIsUserLogged(true);
        setToken(response.token)
        return { success: response.message, error: undefined};
    }

    return(
        <UserContext.Provider value={{
            isUserLogged,
            isUserLoginLoading,
            isUserRegisterLoading,
            loginUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}