import api from "../services/api";

export interface ResponseType{
    success?: string;
    error?: Error;
}

export const useRequest = () => {
    const runRequest = async <T = unknown, U = unknown>(
        url: string,
        method: 'get' | 'post' | 'patch' | 'delete',
        params?: any,
        data?: U | undefined,
        customErrorMessage?: string 
    ) => {
        let response;
        
        try{
            response = await api.request<T>({
                url,
                method,
                params,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer TOKEN_MISSING',
                },
            });

            return response.data;
        } catch (error: any){
            let errorMsg = '';

            console.log(error)

            if (error.response.data) {
                errorMsg = error.response.data;
            } else if (customErrorMessage) {
                errorMsg = customErrorMessage;
            }

            return new Error(errorMsg);
        }
    };

    return { runRequest };
}