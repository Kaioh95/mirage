import { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { CommentContext } from "../../contexts/CommentContext";
import { calcPassedTime } from "../../utils/calcPassedTime";
import { DeleteIcon, EditIcon, UserIcon } from "../Icons"
import { CommentBody, CommentContent, CommentHeader, CommentOwner } from "./styles"

interface CommentCardProps{
    id: string;
    commentIdOwner?: string;
    commentOwnerAvatar?: string;
    commentOwnerName: string;
    createdAt?: string;
    text: string;
}

function CommentCard(props: CommentCardProps){
    const { setCommentIdToEdit, setCommentTextToEdit, deleteComment, setHiddenCommentModal} = useContext(CommentContext);
    const loggedUserId = JSON.parse(localStorage.getItem('userId') || '1');

    const onDelete = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        }

        const { success: response , error} = await deleteComment(props.id, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }
    }

    return(
        <CommentContent>
            {
                loggedUserId === props.commentIdOwner ?
                    <Fragment>
                        <button
                            onClick={e => onDelete()}
                        >
                            {DeleteIcon}
                        </button>
                        <button
                            onClick={async (e) => {
                                setCommentIdToEdit(props.id)  
                                setCommentTextToEdit(props.text)
                                setHiddenCommentModal(false)
                            }}
                        >
                            {EditIcon}
                        </button>
                    </Fragment> : ""
            }
            <CommentHeader>
                <CommentOwner to={`/user/${props.commentIdOwner}`}>
                    {	
                        props.commentOwnerAvatar ?
                        <img src={`http://localhost:5000/images/users/${props.commentOwnerAvatar}`} alt='UserProfile'></img>
                        : UserIcon
                    }
                </CommentOwner>
                <CommentOwner to={`/user/${props.commentIdOwner}`}>{props.commentOwnerName}</CommentOwner>
                <span> &#9830; {calcPassedTime(props.createdAt)}</span>
            </CommentHeader>
            <CommentBody>
                <span>{props.text}</span>
            </CommentBody>
        </CommentContent>
    )
}

export default CommentCard;