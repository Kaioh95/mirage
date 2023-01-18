import { Post } from "../models/Post";
import { ResponseType, useRequest } from '../hooks/useRequest'
import { createContext, ReactNode, useState } from "react";

interface PostContextType{
    isCreatePostLoading: boolean;
    isDeletingPost: boolean
    getPostsLoading: boolean;
    createPost?: (data: Post) => Promise<ResponseType>;
    editPost?: (data: Post) => Promise<ResponseType>;
    delete?: (id: string) => Promise<ResponseType>;
    getPosts: () => Promise<
        | {
            success: undefined,
            error: Error;
        }
        | {
            success: {posts: Post[]};
            error: undefined;
        }
    >;
}

interface PostContextProviderProps{
    children: ReactNode;
}

export const PostContext = createContext({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
    const { runRequest } = useRequest();
    const [isCreatePostLoading, setIsCreatePostLoading] = useState(false);
    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [getPostsLoading, setGetPostsLoading] = useState(false);
    
    const getPosts = async () => {
        setGetPostsLoading(true);

        const customErrorMessage = 'Error retrieving posts.';

        const response = await runRequest<{posts: Post[]}>(
            '/posts/last-posts/?skip=0&limit=50',
            'get',
            undefined,
            undefined,
        );

        setGetPostsLoading(false);

        if(response instanceof Error){
            return {
                success: undefined,
                error: response,
            }
        }

        return { success: response, error: undefined};
    }

    return(
        <PostContext.Provider value={{
            isCreatePostLoading,
            isDeletingPost,
            getPostsLoading,
            getPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}