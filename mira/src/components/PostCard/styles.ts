import styled from "styled-components";
import { Link } from 'react-router-dom'

export const PostContainer = styled.div`
    max-width: 300px;
    min-width: 300px;
    width: 300px;
    margin: 0;
    padding: 0;
    height: fit-content;
    margin-bottom: 20px;
    border-radius: ${({ theme }) => theme.borderRadius.card};

    display: inline-block;
    overflow: hidden;

    &:hover{
        box-shadow: ${({ theme }) => theme.boxShadow};
        opacity: 0.95;
    }
`;
export const PostLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;
export const ImgContainer = styled.div`
    
`;
export const PostImg = styled.img`
    display: block;
    max-width: 300px;
    width: 300px;
`;
export const PostData = styled.div`
    padding: 8px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.tertiary};
`
export const TituloPost = styled.p`
    margin: 10px 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightText};
    
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    font-family: ${({ theme }) => theme.font.family};
    text-shadow: 9px 9px 20px rgba(0, 0, 0, 0.21);
    
    text-align: start;
`
export const PostMetaData = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 4px 8px;
    color: ${({ theme }) => theme.colors.lightText};
`
export const IconData = styled.div`
    display: flex;
    align-items: center;
    opacity: 0.7;

    &>button {
        color: ${({ theme }) => theme.colors.lightText};
        font-weight: ${({ theme }) => theme.font.weight.bold};
        background-color: transparent;
        
        margin-right: 5px;
        width: 20px;
        border: 0;

        &>svg {
            float: left;
        }
    }
`
export const DisplayData = styled.span`
    margin: 0;
    padding: 0;
`