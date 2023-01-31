import { Fragment } from "react";
import CommentCard from "../../components/CommentCard";
import CommentForm from "../../components/CommentForm";
import Header from "../../components/Header";
import { HeartIcon, UserIcon } from "../../components/Icons";
import SmallPostCard from "../../components/SmallPostCard";
import { ContainerPage, ContainerPost, ContainerNewPosts, PageWrapper, HeaderPost, PostTitle, AvatarA, PostAuthor, AuthorNameAndViews, AuthorName, PostViews, PostImg, LikesContainer, LikeButton, LikesInfo, CommentCountInfo, ItensList} from "./styles";

interface PostPageProps{
    id?: string;
    src?: string;
    title?: string;
    likes?: number;
    comments?: number;
    views?: number;
    width?: string; 
}

function PostPage(props: PostPageProps){

    return(
        <Fragment>
            <Header/>
            <PageWrapper>
                <ContainerPage>
                    <ContainerPost className="Post">
                        <HeaderPost>
                            <PostTitle>Meu Post</PostTitle>
                            <PostAuthor>
                                <AvatarA>
                                    {/*	user.image ?
                                        <img src={`http://localhost:5000/images/users/${user.image}`} alt='UserProfile'></img>
                                        : UserIcon
                                    */
                                    UserIcon
                                    }
                                </AvatarA>
                                <AuthorNameAndViews>
                                    <AuthorName> Sr. Kaio Shin</AuthorName>
                                    <PostViews>
                                        <span>100 Views &#9830; 5h</span>
                                    </PostViews>
                                </AuthorNameAndViews>
                            </PostAuthor>
                        </HeaderPost>
                        
                        <PostImg>
                            <img src="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png" alt="Content"></img>
                        </PostImg>

                        <LikesContainer>
                            <LikeButton>
                                {HeartIcon}
                            </LikeButton>
                            <LikesInfo> 60 Likes </LikesInfo>
                        </LikesContainer>

                        <CommentForm/>

                        <CommentCountInfo>
                            20 Comments
                        </CommentCountInfo>

                        <ItensList>
                            <CommentCard commentOwnerName="SR. Kaioh Shin" text="Lorem ipsum"/>
                            <CommentCard commentOwnerName="SR. Kaioh Shin" text="Lorem ipsum"/>
                            <CommentCard commentOwnerName="SR. Kaioh Shin" text="Lorem ipsum"/>
                        </ItensList>
                    </ContainerPost>
                    
                    <ContainerNewPosts className="NewPosts">
                        <ItensList style={{maxHeight: "300px", overflow: "hidden scroll"}}>
                            <SmallPostCard title="New Post 1"/>
                            <SmallPostCard title="New Post 2"/>
                            <SmallPostCard title="New Post 3"/>
                            <SmallPostCard title="New Post 4"/>
                            <SmallPostCard title="New Post 5"/>
                        </ItensList>
                    </ContainerNewPosts>
                </ContainerPage>
            </PageWrapper>
        </Fragment>
    )
}

export default PostPage;