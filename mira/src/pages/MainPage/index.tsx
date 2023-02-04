import { MainContainer, PostsContainer, Tag, TagsAside, TagsContainer, TagTitle } from "./styles"

import PostCard from '../../components/PostCard';

import BugImg from '../../assets/bug-pixel.png';
import FaceImg from '../../assets/face-pixel.png';
import GameImg from '../../assets/game-pixel.png';
import Img from '../../assets/imagen.png';
import { useContext, useEffect, useState, Fragment } from "react";
import { Post } from "../../models/Post";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Header from "../../components/Header";

function MainPage(){
    const { getPosts, getPostsLoading } = useContext(PostContext);
    const [posts, setPosts] = useState<Post[]>();

    const handleGetPosts = async (skip: number, limit: number) => {
        const { success: response, error } = await getPosts(skip, limit);

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
            <Header/>
            <TagsContainer>
                <TagsAside>
                    <Tag to='/' style={{backgroundImage: `url(${BugImg})`}}>
                        <TagTitle>Pets</TagTitle>
                    </Tag>
                    <Tag to='/' style={{backgroundImage: `url(${FaceImg})`}}>
                        <TagTitle>Memes</TagTitle>
                    </Tag>
                    <Tag to='/' style={{backgroundImage: `url(${GameImg})`}}>
                        <TagTitle>Games</TagTitle>
                    </Tag>
                </TagsAside>
            </TagsContainer>
            <PostsContainer>
                <MainContainer>
                    <PostCard id='123'/>
                    <PostCard id='asd' src={BugImg}/>
                    <PostCard id='125' src={FaceImg}/>
                    <PostCard id='sds' src={GameImg}/>
                    <PostCard id='fgd' src={Img}/>
                    { posts?.map((post, index) => (
                        <PostCard 
                            key={index} 
                            id={post._id} 
                            src={`http://localhost:5000/images/posts/${post.image}`}
                            title={post.title}
                            likes={post.likes}
                            comments={post.comments}
                            views={post.views}
                            />
                    )) }
                </MainContainer>
            </PostsContainer>
        </Fragment>
    )
}

export default MainPage