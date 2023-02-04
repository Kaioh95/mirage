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
    getPostById: (id: string) => Promise<
        | {
            success: undefined,
            error: Error;
        }
        | {
            success: {post: Post};
            error: undefined;
        }
    >;
    getPosts: (skip: number, limit: number) => Promise<
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

    const getPostById = async (id: string) => {
        setGetPostsLoading(true);
        const customErroMessage = 'Error fetching post.';

        const response = await runRequest<{post: Post}>(
            `/posts/post/${id}`,
            'get',
            undefined,
            undefined,
            undefined,
            customErroMessage
        )

        setGetPostsLoading(false);

        if(response instanceof Error){
            return{
                success: undefined,
                error: response,
            }
        }

        return { success: response, error: undefined };
    }
    
    const getPosts = async (skip: number, limit: number) => {
        setGetPostsLoading(true);

        const customErrorMessage = 'Error retrieving posts.';

        const response = await runRequest<{posts: Post[]}>(
            `/posts/last-posts/?skip=${skip}&limit=${limit}`,
            'get',
            undefined,
            undefined,
            undefined,
            customErrorMessage
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
            getPostById,
            getPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}