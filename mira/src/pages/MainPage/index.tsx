import { MainContainer, PostsContainer, Tag, TagsAside, TagsContainer, TagTitle } from "./styles"

import PostCard from '../../components/PostCard';

import BugImg from '../../assets/bug-pixel.png';
import FaceImg from '../../assets/face-pixel.png';
import GameImg from '../../assets/game-pixel.png';
import Img from '../../assets/imagen.png';
import logo from '../../assets/logo.png';
import React from "react";

function MainPage(){

    return(
        <React.Fragment>
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
                    <PostCard id='124'/>
                    <PostCard id='125' src={FaceImg}/>
                    <PostCard id='sds' src={GameImg}/>
                    <PostCard id='126'/>
                    <PostCard id='fgd' src={Img}/>
                    <PostCard id='344' src={logo}/>
                </MainContainer>
            </PostsContainer>
        </React.Fragment>
    )
}

export default MainPage