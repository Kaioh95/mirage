import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddButton from "../../components/AddButton";
import CommentCard from "../../components/CommentCard";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import Tabs from "../../components/Tab/Tabs";
import TabsContent from "../../components/Tab/TabsContent";
import TabContent from "../../components/Tab/TabsContent/TabContent";
import TabsHeader from "../../components/Tab/TabsHeader";
import TabHeader from "../../components/Tab/TabsHeader/TabHeader";
import UserImageForm from "../../components/UserImageForm";
import { CommentContext } from "../../contexts/CommentContext";
import { PostContext } from "../../contexts/PostContext";
import { TabContext } from "../../contexts/TabContext";
import { Comment } from "../../models/Comment";
import { Post } from "../../models/Post";
import { ContentArea, ContentAreaContainer, MainArea, PostWrapper, UserArea, UserAreaContainer } from "./styles";

export default function UserPage(){
    const { hiddenPostModal, setHiddenPostModal, getPostsByUser, getPostsUserLiked } = useContext(PostContext)
    const { getCommentsByUserId } = useContext(CommentContext)
    const { selected, selectTab, showTabs} = useContext(TabContext)
    const { id } = useParams();

    const [ postsByUser, setPostsByUser] = useState<Post[]>();
    const [ postsUserLiked, setPostsUserLiked] = useState<Post[]>();
    const [ commentsByUser, setCommentsByUser] = useState<Comment[]>();

    const handleGetPosts = async (liked: boolean) => {
        const { success: response, error } = liked?
            await getPostsUserLiked(id || '') : 
            await getPostsByUser(id || '');

        if(error){
            toast.error(error.message)
            return;
        }

        liked ? setPostsUserLiked(response.posts) : setPostsByUser(response.posts)
    }

    const handleGetComments = async () => {
        const { success: response, error } = await getCommentsByUserId(id || '');

        if(error){
            toast.error(error.message)
            return;
        }

        setCommentsByUser(response.comments)
    }

    useEffect(()=> {
        if(!selected){
            selectTab("postsTab")
        }
        showTabs("postsTab", "favTab", "commentsTab")
        handleGetPosts(true)
        handleGetPosts(false)
        handleGetComments()
    }, [])

    return(
        <React.Fragment>
            <Modal hidden={hiddenPostModal} setHidden={setHiddenPostModal}>
                <PostForm/>
            </Modal>
            <AddButton/>
            <Header/>
            <MainArea>
                <UserAreaContainer className="UserInfo">
                    <UserArea>
                        <UserImageForm/>
                    </UserArea>
                </UserAreaContainer>
                <ContentAreaContainer className="Content">
                    <ContentArea>
                        <Tabs>
                            <TabsHeader>
                                <TabHeader label="Posts" icon="" target="postsTab"/>
                                <TabHeader label="Favorites" icon="" target="favTab"/>
                                <TabHeader label="Comments" icon="" target="commentsTab"/>
                            </TabsHeader>

                            <TabsContent>
                                <TabContent id="postsTab">
                                    <PostWrapper>
                                        { postsByUser?.map((post, index) => (
                                            <PostCard 
                                                key={post._id} 
                                                id={post._id} 
                                                src={`http://localhost:5000/images/posts/${post.image}`}
                                                title={post.title}
                                                likes={post.likes}
                                                comments={post.comments}
                                                views={post.views}
                                                />
                                        )) }
                                    </PostWrapper>
                                </TabContent>

                                <TabContent id="favTab">
                                    <PostWrapper>
                                        { postsUserLiked?.map((post, index) => (
                                            <PostCard 
                                                key={post._id} 
                                                id={post._id} 
                                                src={`http://localhost:5000/images/posts/${post.image}`}
                                                title={post.title}
                                                likes={post.likes}
                                                comments={post.comments}
                                                views={post.views}
                                                />
                                        )) }
                                    </PostWrapper>
                                </TabContent>

                                <TabContent id="commentsTab">
                                    <div>
                                        { commentsByUser?.map((comment, index) => (
                                            <CommentCard
                                                key={comment._id}
                                                id={comment._id}
                                                commentIdOwner={comment.user._id}
                                                commentOwnerAvatar={comment.user.image}
                                                commentOwnerName={comment.user.name || '- -'}
                                                createdAt={comment.createdAt}
                                                text={comment.text}
                                            />
                                        )) }
                                    </div>
                                </TabContent>
                            </TabsContent>
                        </Tabs>
                    </ContentArea>
                </ContentAreaContainer>
            </MainArea>
        </React.Fragment>
    )
}