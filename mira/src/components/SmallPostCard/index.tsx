import { ImgZoom, SmallPostContainer } from "./styles";

interface SmallPostCardProps{
    id?: number;
    title: string;
    image: string;
}

function SmallPostCard(props: SmallPostCardProps){

    return(
        <SmallPostContainer to="/post/333">
            <ImgZoom>
                <img 
                    src={`http://localhost:5000/images/posts/${props.image}`}
                    alt={`Last Post ${props.id}`}/>
            </ImgZoom>
            <p>
                {props.title}
            </p>
        </SmallPostContainer>
    )
}

export default SmallPostCard;