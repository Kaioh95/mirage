import { DeleteIcon, EditIcon, UserIcon } from "../Icons"
import { CommentBody, CommentContent, CommentHeader, CommentOwner } from "./styles"

interface CommentCardProps{
    id?: string;
    commentOwnerAvatar?: string;
    commentOwnerName: string;
    text: string;
}

function CommentCard(props: CommentCardProps){

    return(
        <CommentContent>
            <button>{DeleteIcon}</button>
            <button>{EditIcon}</button>
            <CommentHeader>
                <CommentOwner>{UserIcon}</CommentOwner>
                <CommentOwner>{props.commentOwnerName}</CommentOwner>
                <span> &#9830; 6h</span>
            </CommentHeader>
            <CommentBody>
                <span>{props.text}</span>
            </CommentBody>
        </CommentContent>
    )
}

export default CommentCard