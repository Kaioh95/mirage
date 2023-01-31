import { ImgZoom, SmallPostContainer } from "./styles";

interface SmallPostCardProps{
    id?: string;
    title: string;
    image?: string;
}

function SmallPostCard(props: SmallPostCardProps){

    return(
        <SmallPostContainer to="/post/333">
            <ImgZoom>
                <img 
                    src="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png"
                    alt="Content Last Post 1"/>
            </ImgZoom>
            <p>
                {props.title}
            </p>
        </SmallPostContainer>
    )
}

export default SmallPostCard;