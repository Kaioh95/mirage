import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddButton from "../../components/AddButton";
import CommentCard from "../../components/CommentCard";
import CommentForm from "../../components/CommentForm";
import Header from "../../components/Header";
import { DeleteIcon, HeartIcon, LinkIcon, SolidHeartIcon, UserIcon } from "../../components/Icons";
import LoadingRing from "../../components/LoadingRing";
import Modal from "../../components/Modal";
import PostForm from "../../components/PostForm";
import SmallPostCard from "../../components/SmallPostCard";
import { api_url } from "../../constants";
import { CommentContext } from "../../contexts/CommentContext";
import { PostContext } from "../../contexts/PostContext";
import { Comment } from "../../models/Comment";
import { Post } from "../../models/Post";
import { calcPassedTime } from "../../utils/calcPassedTime";
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
    const { hiddenPostModal, isLoadingLike, getPostsLoading,
        getPostById, getPosts, setHiddenPostModal,
        registerViewLikePost, deletePost } = useContext(PostContext);
    const { hiddenCommentModal, isFetchingComments,
        getCommentsByPostId, setHiddenCommentModal} = useContext(CommentContext);
    const { id } = useParams();

    const [ post, setPost ] = useState<Post>();
    const [ comments, setComments ] = useState<Comment[]>();
    const [ posts, setPosts ] = useState<Post[]>();
    const [ likeInfo, setLikeInfo ] = useState<boolean>(false);

    const handleGetPost = async () => {
        const { success: response, error } = await getPostById(id ? id : '123');

        if(error){
            toast.error(error.message);
            return;
        }

        setPost(response.post);
    }

    const handleGetCommentsByPostId = async () => {
        const { success: response, error } = await getCommentsByPostId(id ? id : '');

        if(error){
            toast.error(error.message);
            return;
        }

        setComments(response.comments);
    }

    const handleGetPosts = async (skip: number, limit: number) => {
        const { success: response, error } = await getPosts(skip, limit);

        if(error){
            toast.error(error.message)
            return;
        }

        setPosts(response.posts)
    }

    const handleRegisterLike = async (isLike: boolean) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        };
        const {success: response, error } = await registerViewLikePost(id || '', headers, isLike);

        if(error){
            toast.error("Login to comment and like posts.");
            return;
        }

        setLikeInfo(response.data?.like || false);
    }

    const handleDeletePost = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        };
        const {success: response, error } = await deletePost(id || '', headers);

        if(error){
            toast.error(error.message);
            return;
        }

        toast.success(response)
    }
    
    useEffect(() => {
        handleGetPost();
        handleGetCommentsByPostId();
        handleGetPosts(0, 5);
        handleRegisterLike(false);
    }, []);

    return(
        <Fragment>
            <Modal hidden={hiddenPostModal} setHidden={setHiddenPostModal}>
                <PostForm/>
            </Modal>
            <Modal hidden={hiddenCommentModal} setHidden={setHiddenCommentModal}>
                <CommentForm postId={id || '1'} isEdit />
            </Modal>
            <AddButton/>
            
            <Header/>
            <PageWrapper>
                <ContainerPage>
                    <ContainerPost className="Post">
                        <HeaderPost>
                            <button onClick={() => handleDeletePost()}>
                                {DeleteIcon}
                            </button>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    toast("link copied to clipboard", 
                                        {position: "bottom-left", autoClose: 1500})
                                }}
                            >
                                {LinkIcon}
                            </button>
                            <PostTitle>{post?.title ? post?.title : '- -'}</PostTitle>
                            <PostAuthor>
                                <AvatarA to={`/user/${post?.user._id}`}>
                                    {	
                                        post?.user.image ?
                                        <img src={`${api_url}/images/users/${post?.user.image}`} alt='UserProfile'></img>
                                        : UserIcon
                                    }
                                </AvatarA>
                                <AuthorNameAndViews>
                                    <AuthorName>{post?.user.name ? post?.user.name : '- -'}</AuthorName>
                                    <PostViews>
                                        <span>{post?.views} Views &#9830; {calcPassedTime(post?.createdAt)}</span>
                                    </PostViews>
                                </AuthorNameAndViews>
                            </PostAuthor>
                        </HeaderPost>
                        
                        <PostImg>
                            <img src={`${api_url}/images/posts/${post?.image}`} alt="Content"></img>
                        </PostImg>

                        <LikesContainer>
                            <LikeButton
                                onClick={e => handleRegisterLike(true)}
                                disabled={isLoadingLike}
                            >
                                {likeInfo? SolidHeartIcon :HeartIcon}
                            </LikeButton>
                            <LikesInfo>{post?.likes || 0} Likes</LikesInfo>
                        </LikesContainer>

                        <CommentForm postId={id || '1'}/>

                        <CommentCountInfo>
                            {post?.comments || 0} Comments
                        </CommentCountInfo>

                        <ItensList>
                            <LoadingRing hide={isFetchingComments}/>
                            {comments?.map((el, index) => (
                                <CommentCard
                                    key={el._id}
                                    id={el._id}
                                    commentIdOwner={el.user._id}
                                    commentOwnerName={el.user?.name || '- -'}
                                    commentOwnerAvatar={el.user?.image}
                                    createdAt={el.createdAt}
                                    text={el.text}
                                />
                            ))}
                        </ItensList>
                    </ContainerPost>
                    
                    <ContainerNewPosts className="NewPosts">
                        <LoadingRing hide={getPostsLoading}/>
                        <ItensList style={{maxHeight: "300px", overflow: "hidden scroll"}}>
                            {posts?.map((el, index) => (
                                <SmallPostCard id={el._id} key={el._id} image={el.image} title={el.title}/>    
                            ))}
                        </ItensList>
                    </ContainerNewPosts>
                </ContainerPage>
            </PageWrapper>
        </Fragment>
    )
}

export default PostPage;