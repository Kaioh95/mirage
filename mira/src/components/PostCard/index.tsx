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
            <PostLink to={props.id ? `/post/${props.id}` : '#'}>
                <ImgContainer>
                    <PostImg width={300} src={props.src}/>
                </ImgContainer>
                <PostData>
                    <TituloPost>{props.title || 'Teste Título'}</TituloPost>
                    
                    <PostMetaData>
                        <IconData>
                            <button>{HeartIcon}</button>
                            <DisplayData>{props.likes || 0}</DisplayData>
                        </IconData>
                        <IconData>
                            <button>{ChatIcon}</button>
                            <DisplayData>{props.comments || 0}</DisplayData>
                        </IconData>
                        <IconData>
                            <button>{EyeIcon}</button>
                            <DisplayData>{props.views || 0}</DisplayData>
                        </IconData>
                    </PostMetaData>
                </PostData>
            </PostLink>
        </PostContainer>
    )
}

export default PostCard;