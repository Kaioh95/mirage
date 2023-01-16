import styled from "styled-components";
import {Link} from 'react-router-dom'
import TagImg from '../../assets/tagback.png'

export const TagsContainer = styled.div`
    display: block;

    background: url(${TagImg}) repeat;

    animation: slide 40s linear infinite;
    will-change: background-position;

    @keyframes slide {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 0 4000px;
        }
    }
`;
export const TagsAside = styled.aside`
    width: 100%;
    height: 200px;
    padding: 20px 0;
    border-bottom: 2px solid #ccc;

    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Tag = styled(Link)`
    width: 100px;
    height: 120px;
    margin: 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    border-radius: ${({ theme }) => theme.borderRadius.button};
    background-color: ${({ theme }) => theme.colors.tertiary};
    background-repeat: no-repeat;
    background-position: center 30%;

    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
`;
export const TagTitle = styled.div`
    text-align: center;
    padding: 8px 0;

    border-radius: ${({ theme }) => theme.borderRadius.button};
    background-color: ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.lightText};
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    font-family: ${({ theme }) => theme.font.family};
`
export const PostsContainer = styled.div`
    width: 100%;
    height: 100vw;
    display: flex;
    justify-content: center;
`;
export const MainContainer = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 80%;
    padding: 40px 0px;
`;