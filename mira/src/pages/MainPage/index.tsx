import { MainContainer, PostsContainer, Tag, TagsAside, TagsContainer, TagTitle } from "./styles"

import PostCard from '../../components/PostCard';

import BugImg from '../../assets/bug-pixel.png';
import FaceImg from '../../assets/face-pixel.png';
import GameImg from '../../assets/game-pixel.png';
import { useContext, useEffect, useState, Fragment } from "react";
import { Post } from "../../models/Post";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import Modal from "../../components/Modal";
import PostForm from "../../components/PostForm";
import { api_url } from "../../constants";
import { useLocation } from "react-router-dom";
import LoadingRing from "../../components/LoadingRing";
import PostsLayout from "../../components/PostsLayout";

function MainPage(){
    const { getPosts, getPostsLoading, hiddenPostModal,
        setHiddenPostModal, searchPostsByTitleOrTags } = useContext(PostContext);
    const [posts, setPosts] = useState<Post[]>();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const handleGetPosts = async (skip: number, limit: number) => {
        const q = query.get('q')
        const tag = query.get('tag')

        const { success: response, error } = q ? await searchPostsByTitleOrTags(q, false) :
            tag ? await searchPostsByTitleOrTags(tag, true) :
            await getPosts(skip, limit);

        if(error){
            toast.error(error.message)
            return;
        }

        setPosts(response.posts)
    }

    useEffect(() => {
        handleGetPosts(0, 50)
    }, [])

    return(
        <Fragment>
            <Modal hidden={hiddenPostModal} setHidden={setHiddenPostModal}>
                <PostForm/>
            </Modal>
            <AddButton/>
            
            <Header/>
            <TagsContainer>
                <TagsAside>
                    <Tag to='/?tag=pets' style={{backgroundImage: `url(${BugImg})`}} reloadDocument>
                        <TagTitle>Pets</TagTitle>
                    </Tag>
                    <Tag to='/?tag=memes' style={{backgroundImage: `url(${FaceImg})`}} reloadDocument>
                        <TagTitle>Memes</TagTitle>
                    </Tag>
                    <Tag to='/?tag=games' style={{backgroundImage: `url(${GameImg})`}} reloadDocument>
                        <TagTitle>Games</TagTitle>
                    </Tag>
                </TagsAside>
            </TagsContainer>
            <PostsContainer>
                <MainContainer>
                    <LoadingRing hide={getPostsLoading}/>
                    <PostsLayout posts={posts}/>
                    {/* posts?.map((post, index) => (
                        <PostCard 
                            key={index} 
                            id={post._id} 
                            src={`${api_url}/images/posts/${post.image}`}
                            title={post.title}
                            likes={post.likes}
                            comments={post.comments}
                            views={post.views}
                            />
                    )) */}
                </MainContainer>
            </PostsContainer>
        </Fragment>
    )
}

export default MainPage