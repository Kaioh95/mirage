import { Post } from "../models/Post";
import { ResponseType, useRequest } from '../hooks/useRequest'
import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export type PostCreateRequest = Omit<Post, '_id' | 'createdAt' | 'updatedAt' | 'user'>;

interface PostContextType{
    isCreatePostLoading: boolean;
    isDeletingPost: boolean;
    getPostsLoading: boolean;
    hiddenPostModal: boolean;
    setHiddenPostModal: Dispatch<SetStateAction<boolean>>;
    createPost: (data: PostCreateRequest, headers: any) => Promise<
        | {
            success: {msg: string},
            error: undefined;
        }
        | {
            success: undefined;
            error: Error;
        }
    >;
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
    const [hiddenPostModal, setHiddenPostModal] = useState(true);

    const createPost = async (data: PostCreateRequest, headers: any) => {
        setIsCreatePostLoading(true);
        const customErrorMessage = 'Error Creating Post.';

        const response = await runRequest<{msg: string}>(
            '/posts/create',
            'post',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsCreatePostLoading(false);

        if (response instanceof Error){
            return{
                success: undefined,
                error: response,
            }
        }

        return { success: response, error: undefined }
    }

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
            hiddenPostModal,
            createPost,
            setHiddenPostModal,
            getPostById,
            getPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}