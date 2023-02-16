import { api_url } from "../../constants";
import { ImgZoom, SmallPostContainer } from "./styles";

interface SmallPostCardProps{
    id?: string;
    title: string;
    image: string;
}

function SmallPostCard(props: SmallPostCardProps){

    return(
        <SmallPostContainer to={`/post/${props.id}`} reloadDocument>
            <ImgZoom>
                <img 
                    src={`${api_url}/images/posts/${props.image}`}
                    alt={`Last Post ${props.id}`}/>
            </ImgZoom>
            <p>
                {props.title}
            </p>
        </SmallPostContainer>
    )
}

export default SmallPostCard;