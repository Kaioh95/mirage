import { EyeIcon, HeartIcon, ChatIcon } from "../Icons";
import { DisplayData, IconData, ImgContainer, PostContainer, PostData, PostImg, PostLink, PostMetaData, TituloPost } from "./styles";

interface PostCardProps{
    id?: string;
    src?: string;
    title?: string;
    likes?: number;
    comments?: number;
    views?: number;
    width?: string;
}

function PostCard(props: PostCardProps){

    return(
        <PostContainer>
            <PostLink href="#">
                <ImgContainer>
                    <PostImg width={300} src={props.src || 'http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png'}/>
                </ImgContainer>
                <PostData>
                    <TituloPost>Teste Título</TituloPost>
                    
                    <PostMetaData>
                        <IconData>
                            <button>{HeartIcon}</button>
                            <DisplayData>10</DisplayData>
                        </IconData>
                        <IconData>
                            <button>{ChatIcon}</button>
                            <DisplayData>4</DisplayData>
                        </IconData>
                        <IconData>
                            <button>{EyeIcon}</button>
                            <DisplayData>60</DisplayData>
                        </IconData>
                    </PostMetaData>
                </PostData>
            </PostLink>
        </PostContainer>
    )
}

export default PostCard;