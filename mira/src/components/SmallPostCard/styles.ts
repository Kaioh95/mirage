import { Link } from "react-router-dom";
import styled from "styled-components";

export const SmallPostContainer = styled(Link)`
    display: flex;
    align-items: center;

    padding: 5px 8px;
    margin-bottom: 10px;
    border-radius: ${({ theme }) => theme.borderRadius.card};
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    
    &:hover{
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;
export const ImgZoom = styled.div`
    margin-right: 10px;
    transition: transform .2s;
    width: 64px;
    height: 64px;

    &:hover {
        transform: scale(1.2);
    }

    &>img{
        width: 64px;
        border-radius: ${({ theme }) => theme.borderRadius.card};
    }
`;