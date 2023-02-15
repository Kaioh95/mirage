import React from "react";
import { useEffect, useState } from "react";
import { api_url, breakpoints } from "../../constants";
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { Post } from "../../models/Post";
import PostCard from "../PostCard";
import { ColumnContainer } from "./styles";

interface PostsLayoutProps{
    posts?: Post[]
}

export default function PostsLayout(props: PostsLayoutProps){
    const { width } = useWindowDimensions();
    const [ numColumns, setNumColumns ] = useState<number>(1);
    
    useEffect(() => {
        if(width < parseInt(breakpoints.sm)){
            setNumColumns(1);
        }
        else if( width >= parseInt(breakpoints.sm) && width < parseInt(breakpoints.lg)){
            setNumColumns(2);
        }
        else{
            setNumColumns(3);
        }

    }, [width])


    return(
        <React.Fragment>
            {[...Array(numColumns)].map((e, i) => {

                return(
                    <ColumnContainer id={`postColumn${i}`} key={i}>
                        {props.posts?.filter((el, postI) => postI%numColumns === i)
                            .map((post, index) => {
                                return(
                                    <PostCard
                                        key={post._id} 
                                        id={post._id} 
                                        src={`${api_url}/images/posts/${post.image}`}
                                        title={post.title}
                                        likes={post.likes}
                                        comments={post.comments}
                                        views={post.views}
                                    />
                                )
                        })}
                    </ColumnContainer>
                )
            })}
        </React.Fragment>
    )
}