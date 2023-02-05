import { calcPassedTime } from "../../utils/calcPassedTime";
import { DeleteIcon, EditIcon, UserIcon } from "../Icons"
import { CommentBody, CommentContent, CommentHeader, CommentOwner } from "./styles"

interface CommentCardProps{
    id?: string;
    commentOwnerAvatar?: string;
    commentOwnerName: string;
    createdAt?: string;
    text: string;
}

function CommentCard(props: CommentCardProps){

    return(
        <CommentContent>
            <button>{DeleteIcon}</button>
            <button>{EditIcon}</button>
            <CommentHeader>
                <CommentOwner>
                    {	
                        props.commentOwnerAvatar ?
                        <img src={`http://localhost:5000/images/users/${props.commentOwnerAvatar}`} alt='UserProfile'></img>
                        : UserIcon
                    }
                </CommentOwner>
                <CommentOwner>{props.commentOwnerName}</CommentOwner>
                <span> &#9830; {calcPassedTime(props.createdAt)}</span>
            </CommentHeader>
            <CommentBody>
                <span>{props.text}</span>
            </CommentBody>
        </CommentContent>
    )
}

export default CommentCard