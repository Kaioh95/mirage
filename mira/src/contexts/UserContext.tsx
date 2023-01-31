import { createContext, ReactNode, useEffect, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { ResponseType, useRequest } from "../hooks/useRequest";
import { User } from "../models/User";

export type UserRequest = Omit<User, 'image' | 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserResponse = Omit<User, 'password' | 'confirmpassword'>;
export type UserEditRequest = Omit<User, 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserLoginRequest = Omit<User, 'name' | 'confirmpassword' | 'image' | 'createdAt' | 'updatedAt' | '__v' | '_id'>;
export type UserLoginResponse = {message: string; token: string; userId: string};

interface UserContextType{
    isUserLogged: boolean;
    isUserLoginLoading: boolean;
    registerUser: (data: UserRequest) => Promise<ResponseType>;
    loginUser: (data: UserLoginRequest) => Promise<ResponseType>;
    signOut: () => void;
    getUserById: (data: {id: string}) => Promise<
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
            success: {users: User[]};
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
    const [userId, setUserId] = usePersistedState<string>('userId', '-1');
    const [user, setUser] = usePersistedState<UserResponse>('user', {_id:'',email:''});

    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isUserLoginLoading, setIsUserLoginLoading] = useState(false);

    const registerUser = async (data: UserRequest) => {
        setIsUserLogged(false);
        setIsUserLoginLoading(true);

        const customErrorMsg = 'Error trying to register.'

        const response = await runRequest<UserLoginResponse, UserRequest>(
            '/users/auth/register',
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

        setToken(response.token);
        setUserId(response.userId);
        await getUserById({id: response.userId});

        setIsUserLogged(true);

        return { success: response.message, error: undefined};
    }

    const loginUser = async (data: UserLoginRequest) => {
        setIsUserLogged(false);
        setIsUserLoginLoading(true);

        const customErrorMsg = 'Error trying to login.'

        const response = await runRequest<UserLoginResponse, UserLoginRequest>(
            '/users/auth/login',
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

        setToken(response.token);
        setUserId(response.userId);
        await getUserById({id: response.userId});

        setIsUserLogged(true);

        return { success: response.message, error: undefined};
    }

    const signOut = () => {
        setIsUserLogged(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('user')
    }

    const getUserById = async (data: {id: string}) => {
        const customErrorMsg = 'Error fetching user'

        const response = await runRequest<{user: User}>(
            `/users/select/${data.id}`,
            'get',
            undefined,
            undefined,
            customErrorMsg
        )

        if(response instanceof Error){
            return {
                success: undefined,
                error: response,
            }
        }

        await setUser(response.user)
        console.log(response.user)
        console.log(user)
        return{ success: response.user, error: undefined}
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsUserLogged(true)
        }
    }, [])

    return(
        <UserContext.Provider value={{
            isUserLogged,
            isUserLoginLoading,
            registerUser,
            loginUser,
            signOut,
            getUserById
        }}>
            {children}
        </UserContext.Provider>
    )
}