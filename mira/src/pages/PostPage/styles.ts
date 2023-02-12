import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    margin-top: 30px;
`;
export const ContainerPage = styled.main`
    width: 80%;
    height: 100vh;
    display: grid;

    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;
    grid-template-areas: "Post NewPosts";

    ${({ theme }) => theme.device.tablet()}{
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 500px;
        grid-template-areas: 
            "Post"
            "NewPosts";
    }
`;
export const ContainerPost = styled.div`
    margin: 0 30px;

    &.Post{
        grid-area: Post;
    }

    ${({ theme }) => theme.device.tablet()}{
        margin: 0 10px;
    }
`;
export const HeaderPost = styled.div`

    &>button{
        float: right;
        width: 18px;
        margin: 0 4px;

        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text};

        &:hover{
            opacity: 0.3;
        }
    }
`;
export const PostTitle = styled.div`
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.xLarge};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.text};
`;
export const PostAuthor = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
`;
export const AvatarA = styled(Link)`
    height: 40px;
    width: 40px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    &>img {
        display: block;
        height: 40px;
        width: 40px;
        border-radius: ${({ theme }) => theme.borderRadius.addButton};
    }

    &>svg{
        display: block;
        height: 40px;
        width: 40px;
        border-radius: ${({ theme }) => theme.borderRadius.addButton};
    }
`;
export const AuthorNameAndViews = styled.div`
    flex-grow: 1;
    margin: 0 10px;
`;
export const AuthorName = styled.div`
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    color: ${({ theme }) => theme.colors.text};
`
export const PostViews = styled.div`
    
    &>span{
        border-radius: 2px;
        background-color: ${({ theme }) => theme.colors.primary};
        font-size: ${({ theme }) => theme.font.size.small};
        color: ${({ theme }) => theme.colors.lightText};
        
        padding: 0 5px;
    }
`;
export const PostImg = styled.div`
    background-color: rgba(0,0,0,.2);
    max-width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    //min-height: 140px;

    &>img{
        max-width: 100%;
    }
`;
export const LikesContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;
export const LikeButton = styled.button`
    width: ${({ theme }) => theme.font.size.xLarge};
    height: ${({ theme }) => theme.font.size.xLarge};
    color: ${({ theme }) => theme.colors.text};
    border: 0;
    background-color: transparent;

    &>svg{
        display: block;
    }
`;
export const LikesInfo = styled.span`
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    color: ${({ theme }) => theme.colors.text};

    margin: 0 8px;
`;
export const CommentCountInfo = styled.div`
    width: 100%;
    margin: 5px 0;
    padding: 15px 0;
    border-bottom: 1px solid #808080;
    font-size: ${({ theme }) => theme.font.size.large};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.text};
    box-sizing: border-box;
`;
export const ItensList = styled.div`
    width: 100%;
    margin-bottom: 40px;
    font-size: ${({ theme }) => theme.font.size.large};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.family};
    box-sizing: border-box;

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 16px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #666; 
    }
`;
export const ContainerNewPosts = styled.div`

    &.NewPosts{
        grid-area: NewPosts;
    }

    ${({ theme }) => theme.device.tablet()}{
        margin: 0 10px;
    }
`;