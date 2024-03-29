import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ResponseType, useRequest } from "../hooks/useRequest";
import { Comment } from "../models/Comment";

export type CommentCreatePost = Omit<Comment, 'post_id' | 'user' | 'createdAt' | 'updatedAt' | '__v' | '_id'>;

interface CommentContextType{
    isCreatingComment: boolean;
    isFetchingComments: boolean;
    isDeletingComment: boolean;
    hiddenCommentModal: boolean;
    hiddenDeleteCommentModal: boolean;
    commentIdToEdit: string;
    commentTextToEdit: string;
    setCommentIdToEdit: Dispatch<SetStateAction<string>>;
    setCommentTextToEdit: Dispatch<SetStateAction<string>>;
    setHiddenCommentModal: Dispatch<SetStateAction<boolean>>;
    setHiddenDeleteCommentModal: Dispatch<SetStateAction<boolean>>;
    createComment: (id: string, data: CommentCreatePost, headers: any) => Promise<ResponseType>;
    getCommentsByPostId: (id: string) => Promise<
        | {
            success: undefined,
            error: Error
        }
        | {
            success: {comments: Comment[]},
            error: undefined
        }
    >;
    getCommentsByUserId: (user_id: string) => Promise<
        | {
            success: undefined,
            error: Error,
        }
        | {
            success: {comments: Comment[]},
            error: undefined,
        }>;
    editComment: (id: string, data: CommentCreatePost, headers: any) => Promise<ResponseType>;
    deleteComment: (id: string, headers: any) => Promise<ResponseType>;
}

interface CommentContextProviderProps{
    children: ReactNode;
}

export const CommentContext = createContext({} as CommentContextType);

export const CommentContextProvider = ({children}: CommentContextProviderProps) => {
    const { runRequest } = useRequest();
    const [isCreatingComment, setIsCreatingComment] = useState<boolean>(false);
    const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);
    const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);
    const [hiddenCommentModal, setHiddenCommentModal] = useState<boolean>(true);
    const [hiddenDeleteCommentModal, setHiddenDeleteCommentModal] = useState<boolean>(true);
    const [commentIdToEdit, setCommentIdToEdit] = useState<string>('');
    const [commentTextToEdit, setCommentTextToEdit] = useState<string>('');

    const createComment = async (id: string, data: CommentCreatePost, headers: any) => {
        setIsCreatingComment(true);
        const customErrorMessage = 'Error Creating Comment.';

        const response = await runRequest<{msg: string}>(
            `/comments/create/${id}`,
            'post',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsCreatingComment(false);

        if (response instanceof Error){
            return  {success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const getCommentsByPostId = async (id: string) => {
        setIsFetchingComments(true);
        const customErrorMessage = 'Error fetching comments.';

        const response = await runRequest<{comments: Comment[]}>(
            `/comments/comment-by-post/${id}`,
            'get',
            undefined,
            undefined,
            undefined,
            customErrorMessage
        )

        setIsFetchingComments(false);

        if(response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response, error: undefined };
    }
    const getCommentsByUserId = async (user_id: string) => {
        setIsFetchingComments(true);
        const customErroMessage = 'Error fetching comments.';

        const response = await runRequest<{comments: Comment[]}>(
            `/comments/comments-by-user/${user_id}`,
            'get',
            undefined,
            undefined,
            undefined,
            customErroMessage
        )

        setIsFetchingComments(false);

        if(response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response, error: undefined };
    }

    const editComment = async (id: string, data: CommentCreatePost, headers: any) => {
        setIsCreatingComment(true);
        const customErrorMessage = 'Error editing comment.';

        const response = await runRequest<{msg: string}>(
            `/comments/edit/${id}`,
            'patch',
            undefined,
            data,
            headers,
            customErrorMessage
        )

        setIsCreatingComment(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    const deleteComment = async (id: string, headers: any) => {
        setIsDeletingComment(true);
        const customErrorMessage = 'Error deleting comment.';

        const response = await runRequest<{msg: string}>(
            `/comments/delete/${id}`,
            'delete',
            undefined,
            undefined,
            headers,
            customErrorMessage
        )

        setIsCreatingComment(false);

        if (response instanceof Error){
            return { success: undefined, error: response }
        }

        return { success: response.msg, error: undefined }
    }

    return(
        <CommentContext.Provider value={{
            isCreatingComment,
            isDeletingComment,
            isFetchingComments,
            hiddenCommentModal,
            hiddenDeleteCommentModal,
            commentIdToEdit,
            commentTextToEdit,
            setCommentIdToEdit,
            setCommentTextToEdit,
            setHiddenCommentModal,
            setHiddenDeleteCommentModal,
            createComment,
            getCommentsByPostId,
            getCommentsByUserId,
            editComment,
            deleteComment,
        }}>
            {children}
        </CommentContext.Provider>
    )
}